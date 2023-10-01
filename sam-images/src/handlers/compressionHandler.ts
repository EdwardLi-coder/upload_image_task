import {S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand} from '@aws-sdk/client-s3';
import sharp from 'sharp';
import {Readable} from 'stream';

const s3 = new S3Client({region: 'us-west-2'});

export const compressImage = async (event: any) => {
    for (event of event.Records) {
        const bucketForPrimitive = process.env.PRIMITIVE_BUCKET_NAME || 'bucket-for-primitive';
        const bucketForCompress = process.env.COMPRESS_BUCKET_NAME || 'happin-public';
        const key = decodeURIComponent(event.s3.object.key.replace(/\+/g, ' '));
        const params = {Bucket: bucketForPrimitive, Key: key}

        const response = await s3.send(new GetObjectCommand(params));
        const body = response.Body;
        let content_buffer;
        if (body instanceof Readable) {
            content_buffer = Buffer.concat(await body.toArray());
        } else {
            throw new Error('Unknown object stream type');
        }
        const compressionSizes = response.Metadata?.compressionsize.split(',') || [1000, 2000];

        const parts = key.split('/');
        const lastPart = parts[parts.length - 1];
        const hashValue = lastPart.split('.')[0];

        for (let compressionSize of compressionSizes) {
            const compressedImage = await sharp(content_buffer)
                .resize(Number(compressionSize), Number(compressionSize), {fit: 'inside'})
                .webp({lossless: true})
                .toBuffer();

            const newKey = `assets/uploads/${compressionSize}/${hashValue}.webp`;

            const result = await s3.send(new PutObjectCommand({
                Bucket: bucketForCompress,
                Key: newKey,
                Body: compressedImage,
                ContentType: 'webp',
                ACL: 'public-read',
            }));
            console.log(JSON.stringify(result, null, 2))
        }
        // 考虑是否需要删除原文件
        await s3.send(new DeleteObjectCommand(params));


    }

};
