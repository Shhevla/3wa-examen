import { Injectable } from '@angular/core';
import { collection, addDoc, getFirestore, getDocs, setDoc, doc, deleteDoc, getDoc, updateDoc, arrayUnion} from "firebase/firestore"; 
import { Subject } from 'rxjs';
import { Appointment} from '../models/appointment-model';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  appointmentDayList: Appointment[] = [];
  appointmentsMonthSubject = new Subject<Appointment[]>();

  constructor() { }

  async createAppointment(appointment: Appointment, location: string) {
    const db = getFirestore();
    this.appointmentDayList.push(appointment)

    try {
        await updateDoc(doc(db, `calendar_manager/${location}/date/02-2023`), {appointments: arrayUnion(appointment)});
        console.log("Appointment saved successfully!");
    } catch (error) {
        console.error("Error saving appointment: ", error);
    }
    this.emitAppointments();
  }

  async getAppointmentsList(location: string) {
    const db = getFirestore();
    console.log("adzdzadzdza");

    const docRef = doc(db, `calendar_manager/${location}/date/02-2023`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        this.appointmentDayList = docSnap.data().appointments;
        this.emitAppointments();
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
  }

  emitAppointments() {
    this.appointmentsMonthSubject.next(this.appointmentDayList);
  }

//   async deleteAppointment(location: string, title: string, appointmentToCheck :Appointment) {
//     const db = getFirestore();
//     await deleteDoc(doc(db,`Calendar/${location}/Users/${title}`));
//     const appointmentIndex = this.appointmentsList.findIndex((appointmentElement) => {
//       if(appointmentElement === appointmentToCheck) {
//         return true;
//       } else {
//         return false;
//       }
//     })
//     this.appointmentsList.splice(appointmentIndex, 1);
//     this.emitAppointments();
//   }
}