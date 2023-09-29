import S3 from 'aws-sdk/clients/s3';

export const createPresignedUrl = async (key: string, type: string) => {
  const s3 = new S3({
    apiVersion: '2006-03-01',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  return new Promise((resolve, reject) => {
    s3.createPresignedPost(
      {
        Bucket: process.env.BUCKET_NAME,
        Fields: {
          Key: key,
          'Content-Type': type,
        },
        Expires: 120, // seconds
        Conditions: [['content-length-range', 0, 2048576]],
      },
      (err, signed) => {
        if (err) return reject(err);
        resolve(signed);
      }
    );
  });
};
