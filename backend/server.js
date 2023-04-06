import express, { application, json } from "express";
import router from "./routes/routes.js";
import routerCabinet from "./routes/routercabinet.js";
import routerProfile from "./routes/routerprofile.js";
import routerFile from "./routes/routerfile.js";
import routerTchat from "./routes/routertchat.js";
import cors from "cors";
import { initializeApp } from 'firebase/app';
import admin from 'firebase-admin'
import { cert } from "firebase-admin/app";


const firebaseConfig = {
    apiKey: "AIzaSyCTIh1DEYjrh9zs6U0XZ4vZSdYM4QjOKkA",
    authDomain: "bagas-sante-63b61.firebaseapp.com",
    databaseURL: "https://bagas-sante-63b61-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "bagas-sante-63b61",
    storageBucket: "bagas-sante-63b61.appspot.com",
    messagingSenderId: "43730415218",
    appId: "1:43730415218:web:631fa5e339245b75df9ceb",
    measurementId: "G-XYNLJ9BH6X"
};

const serviceAccount = {
    "type": "service_account",
    "project_id": "bagas-sante-63b61",
    "private_key_id": "fe58e49ce7a8370e5edee11cf799ddc534189474",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDL68yptnyLR24a\nIsVuroYTp6D4y55sWvzPH9nreHFSAEGskxY1U5jHvJ6Rjx5DApgPgF+C4LPXz0pu\nQSPlSvJUGwhrXGsalmxE6px2gM6RRNwRBNsLDZixu3ORrrTQ+611OeymUGyjzQB7\nwWaZJDPc0hPtInBfoUgSDD6cu9ulsgxHYo9x9Nu+dLiTbiS0ReXd5YHRexSQEBUJ\nX9tqrmwO0BTnIcxtwyK5n2de+tHlHgKceOJeBVjhEnJMT5QDMqEFKlQCqEJiaue0\nYZ2JAo3ZtwQoBdq5O4C0XU2Hp8jjJ4SlRaxQJbEPM2fxG22O5KAYP9fU/h+2g++e\nTgHs8+vtAgMBAAECggEAFs8kwNTvIFsYhybdg5BU4eztlfacnU0eGwLairqZnkz2\nC5oWMVfM7oZ8DBcAkQlAvfcjd82vgBOpJST3IWYdLegqLGwVdM9fg+PkJWMp99jG\nbsbmw1k9e5/WgPSUOA32rHaSsFWtmTLMe4s58SY6ANikrvEbta6iE5a4CCsBGgrZ\nkHZ2y6niO7FB2AdAGKyE+tHGTF0i2GpOGHKCHMnVgOjyTq8rfwNBxkb73Os59T56\n/rXjleTqzBK/rbxv07vt9oVPemZX73zLLqPriVTKZLYvy5rJJVfbqgy+PPTDsOLe\nl1kyIYq9rp0wbJphzmNwxSkzCI4k3SeNcEGuJa1BBwKBgQD2ItbaRpG/v9SNSCr4\n71lUgMB8E0vxOee3HtUy0ZVEYWlrdLXW4Ia/h1aJGrMK7HqG73Gv/0i4rW897I4X\nxM4k1E1+8E72rPg1P2yv2ZF9696UjIRf2kfWEZdGUay8jichU2qCIeMy3McWhWYk\nxA4RgH6Y9BnCIDzLb62zM1KozwKBgQDUF94rGT0VD1GpcR18MtbA2ML9meJn40ZL\njjhchrsZKJMg00NJGPy7JdNiPhiQ8nEmvMy53BvaXZhsE3sYvkma9ZtetjHAbQum\n70l4SMZ5mtBwPktpOwHzGnlT/6iSx1p4uD017IFGo+QeXwVCnnpSJ90tSTwKoq2n\nQNWM5G5WgwKBgEzg+ObYn/Gag1NVtUZnzCkexgB7Ln88LOn/kWv8FnlzS7Aqlhl1\nq+Dq7taIJmBFGMhIxePJAvfcBCD9YCyAZjsOrN33RVK7GBPZqaMLe+wu3ijb8wTV\ncxakC/IE1MVYSVSZb20SFJrwZqbcJ9lX+2TwE5rGs7z0wMhyK3kLkMf1AoGACgNO\nc85vOc1NV6iFcdWcmeIh4oMfUzRBn1OJiaS6tIdb2tLefFb3p4YzopG36y/m86M6\nLxQbJIYCqieJSjPBmdU6jpAfbSw4vprRZyJYbGlIqePm/4LPpsB7NeH9/V/3/3cD\nPMZ7m/Ak1uI5h1mgALztDjRE52OiuyCudEZchy0CgYAXnehL9iWep2BcAoTc6Hab\nFcbus+aEuWxOuUULQJbH7aHF7cZC29iGVGyMiGq8Hs/CtNrZEKgyJU2WWQvr1lSE\n8p0GmMJtvSUNAqArxVJ0ItZgMwzziyi7ytZTEZZci2vhyjxkUzY3sW0xMK9gipk7\n+qZUGGEjlIXpbOAmyYnY1Q==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-ilywr@bagas-sante-63b61.iam.gserviceaccount.com",
    "client_id": "110481998277696731660",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ilywr%40bagas-sante-63b61.iam.gserviceaccount.com"
}

initializeApp(firebaseConfig,{
  credential: cert(serviceAccount),
  storageBucket: '<BUCKET_NAME>.appspot.com'
}); 

admin.initializeApp({
    credential: admin.credential.cert({
        "project_id": "bagas-sante-63b61",
        "client_email": "firebase-adminsdk-ilywr@bagas-sante-63b61.iam.gserviceaccount.com",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDL68yptnyLR24a\nIsVuroYTp6D4y55sWvzPH9nreHFSAEGskxY1U5jHvJ6Rjx5DApgPgF+C4LPXz0pu\nQSPlSvJUGwhrXGsalmxE6px2gM6RRNwRBNsLDZixu3ORrrTQ+611OeymUGyjzQB7\nwWaZJDPc0hPtInBfoUgSDD6cu9ulsgxHYo9x9Nu+dLiTbiS0ReXd5YHRexSQEBUJ\nX9tqrmwO0BTnIcxtwyK5n2de+tHlHgKceOJeBVjhEnJMT5QDMqEFKlQCqEJiaue0\nYZ2JAo3ZtwQoBdq5O4C0XU2Hp8jjJ4SlRaxQJbEPM2fxG22O5KAYP9fU/h+2g++e\nTgHs8+vtAgMBAAECggEAFs8kwNTvIFsYhybdg5BU4eztlfacnU0eGwLairqZnkz2\nC5oWMVfM7oZ8DBcAkQlAvfcjd82vgBOpJST3IWYdLegqLGwVdM9fg+PkJWMp99jG\nbsbmw1k9e5/WgPSUOA32rHaSsFWtmTLMe4s58SY6ANikrvEbta6iE5a4CCsBGgrZ\nkHZ2y6niO7FB2AdAGKyE+tHGTF0i2GpOGHKCHMnVgOjyTq8rfwNBxkb73Os59T56\n/rXjleTqzBK/rbxv07vt9oVPemZX73zLLqPriVTKZLYvy5rJJVfbqgy+PPTDsOLe\nl1kyIYq9rp0wbJphzmNwxSkzCI4k3SeNcEGuJa1BBwKBgQD2ItbaRpG/v9SNSCr4\n71lUgMB8E0vxOee3HtUy0ZVEYWlrdLXW4Ia/h1aJGrMK7HqG73Gv/0i4rW897I4X\nxM4k1E1+8E72rPg1P2yv2ZF9696UjIRf2kfWEZdGUay8jichU2qCIeMy3McWhWYk\nxA4RgH6Y9BnCIDzLb62zM1KozwKBgQDUF94rGT0VD1GpcR18MtbA2ML9meJn40ZL\njjhchrsZKJMg00NJGPy7JdNiPhiQ8nEmvMy53BvaXZhsE3sYvkma9ZtetjHAbQum\n70l4SMZ5mtBwPktpOwHzGnlT/6iSx1p4uD017IFGo+QeXwVCnnpSJ90tSTwKoq2n\nQNWM5G5WgwKBgEzg+ObYn/Gag1NVtUZnzCkexgB7Ln88LOn/kWv8FnlzS7Aqlhl1\nq+Dq7taIJmBFGMhIxePJAvfcBCD9YCyAZjsOrN33RVK7GBPZqaMLe+wu3ijb8wTV\ncxakC/IE1MVYSVSZb20SFJrwZqbcJ9lX+2TwE5rGs7z0wMhyK3kLkMf1AoGACgNO\nc85vOc1NV6iFcdWcmeIh4oMfUzRBn1OJiaS6tIdb2tLefFb3p4YzopG36y/m86M6\nLxQbJIYCqieJSjPBmdU6jpAfbSw4vprRZyJYbGlIqePm/4LPpsB7NeH9/V/3/3cD\nPMZ7m/Ak1uI5h1mgALztDjRE52OiuyCudEZchy0CgYAXnehL9iWep2BcAoTc6Hab\nFcbus+aEuWxOuUULQJbH7aHF7cZC29iGVGyMiGq8Hs/CtNrZEKgyJU2WWQvr1lSE\n8p0GmMJtvSUNAqArxVJ0ItZgMwzziyi7ytZTEZZci2vhyjxkUzY3sW0xMK9gipk7\n+qZUGGEjlIXpbOAmyYnY1Q==\n-----END PRIVATE KEY-----\n",
    }),
    databaseURL: "https://bagas-sante-63b61-default-rtdb.europe-west1.firebasedatabase.app"
});

console.log();
const app = express()


app.use(cors({
    origin: '*'
}));
    
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/cabinet/", routerCabinet);
app.use("/upload/", routerFile);
app.use("/profile/", routerProfile );
app.use("/tchat/", routerTchat);
app.use("/", router);

app.listen(3000, () => console.log("Server ready"));