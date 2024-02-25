import {
  S3Client,
  PutObjectCommand,
} from '@aws-sdk/client-s3'
import key from './private'
const s3 = new S3Client({
  region: 'ap-southeast-1',
  credentials: {
    accessKeyId: key.accessKeyId,
    secretAccessKey: key.secretAccessKey
  }
})

export default async function uploadS3 (file,filename){
    const res = await file.arrayBuffer()
    const params = {
    Bucket: 'myproductlist',
    Key: filename,
    Body: res
  }
  const command = new PutObjectCommand(params)
  await s3.send(command)
  return 0
}