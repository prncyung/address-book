            function addrBook()
            {
                this.myAddressBook = [];
            }

            addrBook.prototype.add = function(newName,newEmail,newPhone,pics,imgScr){
                const newContact = {name:newName, email:newEmail, phone:newPhone, picture:pics,imgSource:imgScr};
                this.myAddressBook = [...this.myAddressBook,newContact];
                msg = 'Contact added successfully.';

                return msg;
            };
/*  *************************************************************************************************************  */
            //deleting a contact in the address book
            addrBook.prototype.remove = function(newEmail){
                let msg = '';
                let found ='';
                if(this.myAddressBook.length > 0)
                {
                    // first check whether email exist in address book
                    found = this.myAddressBook.find(contact => contact.email === newEmail);
                    if(found !=='' && found != 'undefined' && found !== undefined)
                    {
                        // remove contact 
                        this.myAddressBook = this.myAddressBook.filter(contact => contact.email !== newEmail);
                        msg = "Cotact removed successfully";
                    }else { 
                        msg = "Failed! Contact was not found. ";
                     }
                }
                else msg = "Faild! The address book is empty";
                
                return msg;
            };
/*  *************************************************************************************************************  */
             //Editing a contact in the address book
             addrBook.prototype.update = function(oldEmail,newEmail,newName,newPhone){
                 // first perform find operation to check whether email exist
                 let found ='';
                 let msg='';
                 found = this.myAddressBook.find(contact => contact.email === oldEmail);
                 if(found !=='' && found != 'undefined' && found !== undefined)
                 {
                     this.myAddressBook = this.myAddressBook.map(contact => contact.email !== oldEmail ? contact : {...contact, name:newName, email:newEmail, phone:newPhone})
                     msg = 'Update operation was successful.';
                 }
                 else { 
                     msg = "Failed! Empty address book or email does not exist";
                }

                 return msg;
             }
/*  *************************************************************************************************************  */
            //view all the contacts in the address book
            addrBook.prototype.viewAll = function(){ 
                return this.myAddressBook.map(contact =>  contact.name  +'<input style="float:right;" type="button" value="Manage" name="'+contact.email+'" onclick="manageContact(this.name);" /><hr/> ' );
            };
/*  *************************************************************************************************************  */
            //view single contact in the address book
            addrBook.prototype.view = function(email){  
                let html='';
                let myContact = this.myAddressBook.find(contact => contact.email === email);
                if(myContact !== '' && myContact !== undefined)
                {
                    html = '<div id="contactView1" class="contactView1 a" style="position:relative;"><div class="name-email-phone"><div class="for-name">Name :</div><div class="name-detail">' +myContact.name+'</div><br><div class="for-name">Email :</div><div class="name-detail">' +myContact.email+'</div><br><div class="for-name">Phone :</div><div class="name-detail">' +myContact.phone+'</div></div><div class="image-div"><img src="'+myContact.imgSource+'" height="90" width="110"/></div></div>';
                }
                else html = '<div class="response"><h3>Contact with email not found</h3></div>';

                return html;
               // return this.myAddressBook.map(contact => contact.picture + '<br/>Name: ' + contact.name + '<br/>'+' Email: ' + contact.email + '<br/>' +' Phone: ' + contact.phone +'<input type="button" value="Manage" name="'+contact.email+'" onclick="manageContact(this.name);" /><hr/> ' );
            };
/*  *************************************************************************************************************  */
            (function(d,w){

                let contactBook = new addrBook(); // instantiate addressbook

                // USER CLICKS ON SAVE BUTTON TO SAVE CONTACT
                d.getElementById('save').addEventListener('click', function () {
                    var newName = document.getElementById('name').value;
                    var newEmail = document.getElementById('email').value;
                    var newPhone = document.getElementById('phone').value;
                    let msg = '';
                    let imgScr = '';
                    let bool = false;
                    if(newName != '' && newEmail != '' && newPhone != '')
                    {   
                            var imageFile = document.getElementById('image').files[0];
                            var work = document.getElementById('workTable');
                            work.innerHTML = '';
                            var img = document.createElement("img");
                            document.getElementById('workTable').appendChild(img);
                            var reader = new FileReader();
                            reader.onloadend = function () {
                                img.src = reader.result;
                                imgScr = reader.result;
                                img.setAttribute("style", "height:50px;");

                                // add to address book.
                                let msg = contactBook.add(newName,newEmail,newPhone,work.innerHTML,imgScr);
                                bool= true;
                                alert(msg);

                                //refresh the contact list to reflect the updated record
                                let v = contactBook.viewAll();
                                document.getElementById('address-book').innerHTML = v;
                                clearInputs();
                                return;
                            };
                            reader.readAsDataURL(imageFile);
                    }
                    else alert ("Some fields are empty");

                });
                
                //USER CLICKS ON UPDATE CONTACT BUTTON
                d.getElementById('update').addEventListener('click', function () {
                    // get the form fields
                    let msg ='';
                    let oldEmail = document.getElementById('oldEmail').value;
                    let newName = document.getElementById('name').value;
                    let newEmail = document.getElementById('email').value;
                    let newPhone = document.getElementById('phone').value;
                    if(newName != '' && newEmail != '' && newPhone != '')
                    {
                        msg = contactBook.update(oldEmail,newEmail,newName,newPhone);
                    }
                    else msg = "Some fields are empty";
                    alert(msg);

                    //refresh the contact list to reflect the updated record
                    let v = contactBook.viewAll();
                    document.getElementById('address-book').innerHTML = v;
                    clearInputs();
                });

                //USER CLICKS ON VIEW ALL CONTACT BUTTON
                d.getElementById('viewAll').addEventListener('click', function () {
                    let v = contactBook.viewAll();
                    document.getElementById('address-book').innerHTML = v;
                });

                //USER CLICKS ON VIEW ON EACH  CONTACT BUTTON
                d.getElementById('view').addEventListener('click', function () {
                    let email = document.getElementById('oldEmail').value;
                    let v = contactBook.view(email);
                    document.getElementById('contactView').innerHTML = v;
                });

                //USER CLICKS ON DELETE CONTACT BUTTON
                d.getElementById('delete').addEventListener('click', function () {
                    let email = document.getElementById('oldEmail').value;
                   let msg = contactBook.remove(email);
                   alert(msg);
                });
            }(document,window));

            function manageContact(email)
            {
                document.getElementById('oldEmail').value = email;
                document.getElementById('currentOperation').innerHTML = "Make changes to contact with email: "+email;
                // display the buttons for managing contacs
                //document.querySelectorAll('.save').setAttribute('style','display:none');
                //document.querySelectorAll('.btn-manage').setAttribute('style','display:block');
                //contactBook.view();
                //alert('pls write the code to edit, update and delete contact here. '+email);
            }

            /* ***************************************************************************************************** */
           
            
            // a function to clear all the inputs 
            function clearInputs() {
                document.getElementById('addressBookForm').reset();
            }