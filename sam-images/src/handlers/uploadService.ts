import {S3} from '@aws-sdk/client-s3';
import crypto from 'crypto';
import mime from 'mime-types';

const s3 = new S3({region: 'us-west-2'});

// 定义参数对象
interface UploadParams {
    file: Buffer;
    filename: string;
    imageWidth: number[];// 将类型定义为一个字符串，包含 "1000"、"2000" 或两者都有 type用","分割
    mimeType: string;
    owner: string;
}

export const uploadToS3 = async (uploadParams: UploadParams): Promise<string> => {
    const {file, owner, mimeType, imageWidth} = uploadParams;
    // const CROWDCORE_BUCKET = 'happin-public';
    // Key is the unique identifier of the file including the path, filename and file extension
    const bucketName = process.env.PRIMITIVE_BUCKET_NAME || 'bucket-for-primitive'; // orginal without compression
    // generate unique key using md5
    const hash = crypto.createHash('md5').update(file).digest('hex');

    const key =  `assets/uploads/${imageWidth[0]}/${hash}.${mime.extension(mimeType)}`;

    await s3.putObject({
        Bucket: bucketName,
        Key: key,
        // the buffer of the file to be uploaded
        Body: file,
        // Optional metadata, specifies the owner and mimetype of the file,
        // doesn't affect the file itself
        Metadata: {
            owner: String(owner),
            MimeType: String(mimeType),
            compressionSize: imageWidth.join(','),
        },
        // Content type - when access from HTTP, this content type will be used in the header
        ContentType: mimeType,
        // ACL - the access level of this file
        // public-read means can be accessed by anyone without auth
        ACL: 'public-read',
    });
    return key;

};
