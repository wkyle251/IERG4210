This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

pre requisite: npm (node)

Please install the package first by

```bash
npm i
#or
yarn add
```

Please make sure you have the correct private.js in your /src path

Please also configure the publickey and private for password verify by

```bash
openssl genpkey -algorithm RSA -out private_key.pem -aes256
openssl rsa -pubout -in private_key.pem -out public_key.pem
openssl rsa -in private_key.pem -out decrypted_private_key.pem
```

Then, copy the installed path to private.js

after, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy details

1. Please make sure you have private.js file in your /src
2. If you want to access /admin, make sure you login as admin account first
