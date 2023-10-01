## Project Overview
- Successfully generated the `sharp-layer` using commands.
- Created two crucial files:
- `uploadService.ts`
- `compressionHandler.ts`
### uploadService.ts

This file is used to upload images to the original storage bucket. The required parameters include the file, filename, and type.

**Type Parameter** :
- A string containing "1000," "2000," or both, separated by commas.

**Key Structure** : `uploads/${type}/${filename}/${hash}` to ensure uniqueness.
### compressionHandler.ts

This file serves as an asynchronous image compressor function:
- Retrieves images from the `bucket-for-primitive`.
- Compresses using `sharp` based on the received type for lossless compression.
- Determines whether to delete based on file size, e.g., delete if the file size is greater than 1MB.
## Configuration and Deployment
1. Ensure you have configured AWS CLI and installed SAM CLI.
2. Run the following commands in the project root directory to deploy the project:

```sh

npm run sam-build

sam deploy --guided
```


### upload.test.ts

Jest tests are added to [upload.test.ts](https://chat.openai.com/c/__tests__%2Funit%2Fhandlers%2Fupload.test.ts)  to interact with S3.
## Using Sharp in Lambda Layers

Including the `sharp` library in Lambda Layers offers the following benefits:
- Reuse it across multiple Lambda functions without the need for packaging and uploading it every time.
- Reduce deployment size, time, and management complexity.
- When updating `sharp` or fixing bugs, update it in the Layer without affecting other Lambda functions.
## Local Mechanism of Sharp

In a local development environment, `sharp` is typically directly installed as a project dependency and referenced in the code. This means that every time the application is deployed or packaged, `sharp` and the application code are packaged together.
