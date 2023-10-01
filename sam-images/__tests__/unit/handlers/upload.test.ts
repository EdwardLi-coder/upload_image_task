import {uploadToS3} from '../../../src/handlers/uploadService';
import * as fs from 'fs';
import * as path from 'path';

describe('Image processing and upload handler', () => {
    it('should process and upload an image', async () => {
        // 读取本地图像文件并将其转换为 Buffer
        const filePath = '/Users/lifei/Desktop/sds.png';
        const testBuffer = fs.readFileSync(filePath);
        const result = await uploadToS3({
                file: testBuffer,
                filename: 'sds',
                imageWidth: [1000, 2000],
                mimeType: 'image',
                owner: 'test',
            }
        );
    }, 10000);
});
