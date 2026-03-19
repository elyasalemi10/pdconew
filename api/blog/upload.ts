import type { VercelRequest, VercelResponse } from '@vercel/node';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

function slugifyFilename(name: string): string {
  const ext = name.split('.').pop() || '';
  const base = name.replace(/\.[^/.]+$/, '');
  return base
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const authHeader = req.headers.authorization;
  if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { file, filename, alt_text, post_id } = req.body;

    if (!file || !filename) {
      return res.status(400).json({ error: 'File and filename are required' });
    }

    // Decode base64 file data
    const buffer = Buffer.from(file, 'base64');

    // Process image with sharp (convert to WebP, resize)
    let sharp;
    try {
      sharp = (await import('sharp')).default;
    } catch {
      // sharp not available, upload as-is
      const timestamp = Date.now();
      const sluggedName = slugifyFilename(filename);
      const key = `blog/${timestamp}-${sluggedName}.webp`;

      await s3.send(new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME!,
        Key: key,
        Body: buffer,
        ContentType: 'image/webp',
        CacheControl: 'public, max-age=31536000, immutable',
      }));

      const url = `${process.env.R2_PUBLIC_URL}/${key}`;

      const { data: imageRecord } = await supabase
        .from('images')
        .insert({
          url,
          alt_text: alt_text || null,
          original_filename: filename,
          size_bytes: buffer.length,
          post_id: post_id || null,
        })
        .select()
        .single();

      return res.status(200).json({ url, image: imageRecord });
    }

    // Process with sharp: convert to WebP, resize to max 1200px wide
    const processed = await sharp(buffer)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer();

    const metadata = await sharp(processed).metadata();

    const timestamp = Date.now();
    const sluggedName = slugifyFilename(filename);
    const key = `blog/${timestamp}-${sluggedName}.webp`;

    await s3.send(new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: key,
      Body: processed,
      ContentType: 'image/webp',
      CacheControl: 'public, max-age=31536000, immutable',
    }));

    const url = `${process.env.R2_PUBLIC_URL}/${key}`;

    const { data: imageRecord } = await supabase
      .from('images')
      .insert({
        url,
        alt_text: alt_text || null,
        original_filename: filename,
        size_bytes: processed.length,
        width: metadata.width || null,
        height: metadata.height || null,
        post_id: post_id || null,
      })
      .select()
      .single();

    return res.status(200).json({ url, image: imageRecord });
  } catch (error) {
    console.error('Error uploading image:', error);
    const message = error instanceof Error ? error.message : 'Failed to upload image';
    return res.status(500).json({ error: message });
  }
}
