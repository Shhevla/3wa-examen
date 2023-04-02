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
      apiKey: "AIzaSyC_oQY_vWLvaleuC92WJzsaGjQuFryvqaI",
      authDomain: "wa-test-bagas.firebaseapp.com",
      databaseURL: "https://wa-test-bagas-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "wa-test-bagas",
      storageBucket: "wa-test-bagas.appspot.com",
      messagingSenderId: "892215932810",
      appId: "1:892215932810:web:40ef5d067c0244b1bbba73",
      measurementId: "G-PKME64FC30"
};

const serviceAccount = {
  "type": "service_account",
  "project_id": "wa-test-bagas",
  "private_key_id": "a1a5c880b319f6c5e4b88cecb215e7b2d6805ba0",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDl5+HkrPc+p66z\nGAE74yFqBSan1aFrjnyOiyCq6wduCZl2F4EPcDzTg9Vso3YW5jaKKFj8UAWKMfn6\nheLKa5TfWZkA2CHJHGBLB0mNOD5r8087VqWzpwp7WS+xRP9QItDMpQ1ooeF9xxL9\nCZ42nPymzSavpUOoEKo9a9nKvDRGts2uWRc6WabnZkrLzvjqFaWYZ+sKaRAR+ZE9\n3O/vuFQM0sy7OXeKrjKAItZ7HwSzmhAHtv4ZdHbv1HyVMxolbRUa9ULKmUg6EM1y\n6gYPY8l3Nx5kD3YC1mimh0StbftTQ8P93nnXyiqxa8mU+9HzEOyM2BL02k3wkws3\n4yTqAb65AgMBAAECggEATMXzdEaiReT+/MVuXA5L8TiJIRDA18b8Jymkng7gK0m/\nWmUc7wfe+A8VLTMk0x7LZbV1icQ7JVvtC1C8XDYyv6cO5e5G0f7M1SE42ZTHm4rj\nkYAs02JbqLcuqvbMf3kw2rXfVWqBf1wEJkWY9MnVwOnPGmaIwk3WW65xSzcwCdCN\ngk3YCtwFDdT0nPHAlRyw6XOVwhgiXjvFVajVsA2r5wW29pUPAGe+oo0DUCBy81zZ\nXd5LDay1XZL0zrkBtEMzOLTxQ5vuFXilKQRvKu6Xb4NU2wfH+3RfeMG8vEmFHPCo\nuz/2EL4FfWzBS0YLnaRvsglLNP94M7WT/sJLAKDwpQKBgQD+9B5tznUn4xFrEWNT\n9zTcy663tbBXmm72ulw95ddCXjFnhejNdNi7uj66t/5/wTIV59Iusnqk8MqyO8Ip\nG+24UQAiHnhP7B3q0T36z//kDeCbrZ69JEkcfWWxst2Y447TPw9YliHgovTc46py\nZQzknqA5KM58gqJj2dYIQf0TpwKBgQDm2XIXnY846lzqp6RHCu/HwcfL6sFNF1nm\ncunmGARrYdo71KiHfYYGlChIeuvMONbWZ1idziCV2yWCUeMCu3bsQouU0nuPHaQn\nVb+Nn6/a/908+sUMoehsBe5PVO+b+JT/lC/dWB2W1W+y5RlI9XTKgFrzwBtWnX41\nc/4MX9JmnwKBgQC1R9EHFMDazqrI7YEp5+FviWg++fJcJ9P0nUgPPwkTCLSqPl3t\nEMM2oFQQIdnU7wL07nPVflSUSR5nIvSIlHIwF3A30mCLu4D+QS+H0jPJ7VAigY4Y\nQN+3YTZY5qyIFG2uqOz5eS63ckcXdM3yLwW+3UdhvTEs+RoMU4zLLFiNiwKBgEyk\nGIralngw5tRI//NOIDlTjn+W2sI7ZG9r61em1aDJBekjOyhwdhStD4qwtKRCoqDg\nAr2xd4QJE7TmdtWrY1og5bJtBvSGxL8Cauwb/ghZNhxOrSj6f+2NModIDZzctKr9\nib6UyI4RIlpkUTa1tyab4pZWSz1AYGxirA9zqKjFAoGAD77fCAPVnUpTWaKjkfq6\ng206RZN9utJQXF7CnsEwEw/fhaKugEgPcttPah4kiuGKoCVU66P5a7MWaDX9rsbR\nH3pwkzATYfzcauYn7GX/4TD3FxKocuHqNSACgnHvB16wXT2Vw0eDWkcTbkzzk10V\nrac8GoLJjEk9AEwQ5u0cQho=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-5w65x@wa-test-bagas.iam.gserviceaccount.com",
  "client_id": "110453948851933324180",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-5w65x%40wa-test-bagas.iam.gserviceaccount.com"
}
//initializeApp(firebaseConfig);
initializeApp(firebaseConfig,{
  credential: cert(serviceAccount),
  storageBucket: '<BUCKET_NAME>.appspot.com'
}); 

admin.initializeApp({
    credential: admin.credential.cert({
        project_id: "wa-test-bagas",
        client_email: "firebase-adminsdk-5w65x@wa-test-bagas.iam.gserviceaccount.com",  
        private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDoS6lK06Pug0uF\nzk2Q34M5aQ8TxxHZfAC8XgcO3MY6R4aoODhKWEPz0qi19QSFeCVDWyf/kzFk2kAj\nzMJIgI/vsM45GwMPF0ifywiQWS3cZNNhJSqUxnaEy4yCuU44GitCpS8XDJHPPPav\n5w/tKtL0ouoJTOiWwPUPGZtYOQXsALr44w1KML6+eNCBcmzEHurD5IZuhXaQpnIA\nPXelrXm9AHFt8lgWvjo97LfMZ0cEJ0ABRWh1a3Z0Pz2MybrnnQBQLMchHV38rZpD\nvvky3C2RZWjairaIme5Espmr1GKtDT6BQT3zMEusSuklejTkwlyK82EAmv/ae44b\nrOeL2CUjAgMBAAECggEAQOT2N+m1F8pFHG3cXHccnTq81A0ebvAF8pmgBiZmGFzo\nAPGnxBkxbpmwuRhoeXLtkgoSvALeXyrblUS8F+4Wh+MQUYK60YnzJ3TcgRrwxWvD\nY5Wy9hoVfRayO8jR0bl50WX9KEbCKy+ASPbXi62VfnNOx2ddaNQiAeRo8fYIMfwf\n5enHTDxN19KjkhWF8DkxJ/MF4SGxd1xi3Xzo6QVdG41c1o7S4EHL1xzqOAHEfUqs\n87TBMQBI6jts/dwjUCyV1Z27I0sCeN86Jel7yTvyz9TR539pEcpf6NmAi0+WdCDL\n6dYXqi1NFBmKhXW7YEzqYjC3UrnpahEh/SIs4iQ0wQKBgQD9T7E5+NVoqZoberX2\n7fSC3OEJrZWLDzK4Ajm7qO4r0qE+wShiWv79hAb1yOIiK9PB2fwnBTNZrFY6zEMC\nLmkRIbeWvmnJaslBs8Qxj2+r8ez7AfrU8PL9eXXRelRfwtjs/qa9ipxOcbRtzzb9\nmmM5Zb3/gJ0X1rGeiKUKK3DKwQKBgQDqwt06WSTGb85Om5mxOyq+Piod2EJU9iVN\nVdz/PMpnnBOsL0WkyYDjNgKgk1TB3I22e+KFI28n8FJzQkTOJ4UTN//9kMdsxvIy\nBkU2m6kFtJbaFKQJQhYl8g3mYJsCDxR1YW/QEgpXU7SySdl30dSsGKE6cMEoM73M\nVaNPDrdc4wKBgQDZspqKSvsFdvT1dtFZhQllSfSw/5iMqSQalfcN+1GtIdjn+NL/\nLFsGf2gH5XvKiEX1zKRy2HpYL87vu0o/Xql3SrXf/Icnzflm2NrdCPudF05mLj5m\nsSjzhGYoAGzw26DYlMWyEaThmcDJupL1ArERzAmswti/ewitSZwlEE5gQQKBgH1M\ngk1ZNPKgzClSjWZ14OtnPI1vVoAIXIJ5WJn2NUW1nR5ioLZCQoOC2UYhPLS35f9H\nAfDzp6lWcHtKHHU3zKQkWIJa2sXpLW2bwSdTT5RW/cjqCV9ToYShO+ABIdqod8/q\nsIYKivBvIdui5Oo52Vv9TVhmxAGUFDJSZvaUMTPnAoGBAPxF9AYJLOyF6Y5OA/M2\nDeWch9StB/YIflDfDctZfaeNIu6gbIGGyl+7/CPySitZhvaDaKqbyDXNJbhetnEq\nhbtwNsm59rcuEpnha3egjjOmMLuL2vscVIhdG9QLrQLkihp3J9f6eApRJZFjyo52\nVQAMMfMdYl00KP6vRKl6n+/M\n-----END PRIVATE KEY-----\n",    
    }),
    databaseURL: "https://wa-test-bagas-default-rtdb.europe-west1.firebasedatabase.app"
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