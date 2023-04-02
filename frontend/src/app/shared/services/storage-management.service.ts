import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Member } from '../models/member.model';
import { Documents } from '../models/documents.model';
import { deleteObject, getDownloadURL, getStorage, listAll, ref as _storageRef, StorageReference, uploadBytesResumable } from 'firebase/storage';
import { CallApiService } from './call-api.service';
import { MessagesService } from './messages.service';
import { MembersService } from './members.service';



@Injectable({
  providedIn: 'root'
})
export class StorageManagementService {
  cityLocation = "";
  progress = 0;

  members: Member[] = [];
  documents: Documents[] = [];

  membersSubject = new Subject<Member[]>();
  documentsSubject = new Subject<Documents[]>();
  

  constructor(private api: CallApiService, private message: MessagesService, private memberService: MembersService) { }

  // File upload/Download part of member

  ngOnInit() {
    this.getMembers()
  }

  getMembers() {
    this.members = this.memberService.members;
  }

  uploadFile(file: File, id :string, member :Member, uid:string) {
    const storage = getStorage();
    let storageRef: StorageReference

    this.getMembers()
    let memberIndex = this.members.indexOf(member).toString();
    

    storageRef = _storageRef(storage, `images/${id}/members/${member.firstName}_${member.lastName}/${file.name}`);
    this.api.dlVerif(uid, memberIndex, id, member, "upload").then(data => {
    if (data.response == "ok") {
    
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed',
      (snapshot) => {
        this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
          case 'paused':
            this.message.displayMessage("Le téléchargement est en pause", "information");
            break;
          case 'running':
            break;
        }
      }, 
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            this.message.displayMessage("Vous n'avez pas les droits pour accéder à ce fichier", "refused");
            break;
          case 'storage/canceled':
            this.message.displayMessage("L'envoi du fichier a été annuler", "refused");
            break;
          case 'storage/unknown':
            this.message.displayMessage("Une erreur inconnue s'est produite", "reject");
            break;
        }
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // need to check if this document has the same file name than the others in this folder. 
          this.message.displayMessage("Le fichier a bien été ajouté", "information");
          this.documents.push(new Documents(uploadTask.snapshot.ref.name ,downloadURL))
          this.emitDocuments();
        });
      }
    );}}).then(() => {
      return "finished";
    });
  }

  getAllFiles(id :string, member :Member, uid:string) : Documents[] {
    const storage = getStorage();
    this.getMembers()
    let storageRef: StorageReference;
    this.documents = [];
    this.emitDocuments();
    
    let memberIndex = this.members.indexOf(member).toString();
    

    this.api.dlVerif(uid, memberIndex, id, member, "list").then(data => {
    if (data.response == "ok") {

    storageRef = _storageRef(storage, `images/${id}/members/${member.firstName}_${member.lastName}/`);
      listAll(storageRef)
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          
        });
        res.items.forEach((itemRef) => {
          getDownloadURL(itemRef)
          .then((url)=> { 
            this.documents.push(new Documents(itemRef.name ,url))
            this.emitDocuments();
          })
        });
      }).catch((error) => {
        
      }).then(() => 
      {
        return this.documents;
      });} 
    });
    return this.documents;
  }

  emitDocuments() {
    this.documentsSubject.next(this.documents);
  }

  removeDocument(id :string, member : Member, document: Documents, uid:string) {
    this.getMembers()
    let memberIndex = this.members.indexOf(member).toString();
    

    this.api.dlVerif(uid, memberIndex, id, member, "delete").then(data => {
    if (data.response == "ok") {
    const documentIndex = this.documents.findIndex((documentElement) => {
      if(documentElement === document) {
        return true;
      } else {
        return false;
      }
    })
    this.documents.splice(documentIndex, 1);
    const storage = getStorage();
    const ref = _storageRef(storage, `images/${id}/members/${member.firstName}_${member.lastName}/${document.name}`);

    deleteObject(ref).then(() => {
      // File deleted successfully
      this.message.displayMessage("Le fichier à bien été supprimer", "resolve");
    }).catch((error) => {
      // Uh-oh, an error occurred!
      this.message.displayMessage("Une erreur est survenue", "reject");
    });
    this.emitDocuments();
    }});
  }

  removeAllDocuments(id :string, member : Member, uid:string) {
    this.getMembers()
    let memberIndex = this.members.indexOf(member).toString();
    

    this.api.dlVerif(uid, memberIndex, id, member, "delete").then(data => {
    if (data.response == "ok") {
    const storage = getStorage();
    const ref = _storageRef(storage, `images/${id}/members/${member.firstName}_${member.lastName}`);

    listAll(ref)
    .then((res) => {
      res.items.forEach((itemRef) => {
        deleteObject(itemRef).then(() => {
          // File deleted successfully
          this.message.displayMessage("Les fichiers ont bien été supprimer", "resolve");
        }).catch((error) => {
          // Uh-oh, an error occurred!
          this.message.displayMessage("Une erreur est survenue", "reject");
        });
      });
    }
    ).catch((error) => {
      
    }
    ).then(() =>
    {
      this.documents = [];
      this.emitDocuments();
    }
    );
  }});
}
}

