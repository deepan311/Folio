import React from "react";
import { AiFillGithub } from "react-icons/ai";
import { BsLinkedin, BsTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

function Contact({ data, email }) {
  //   const contact = [
  //     {
  //       icon: MdEmail,
  //       name: "Email",
  //       content: userData.contact.email,
  //       link: "dee",
  //     },
  //     userData.contact.phone && {
  //       icon: BsTelephoneFill,
  //       name: "Phone",
  //       content: userData.contact.phone,
  //       link: "",
  //     },
  //     userData.contact.linkedin && {
  //       icon: BsLinkedin,
  //       name: "Linked In",
  //       content: "click here",
  //       link: userData.contact.linkedin,
  //     },
  //     userData.contact.github && {
  //       icon: AiFillGithub,
  //       name: "GitHub",
  //       content: "click here",
  //       link: userData.contact.github,
  //     },
  //   ];

  return (
    <>
      {/* EMAIL========== */}
      <div className="flex my-4 gap-3 items-center">
        <MdEmail />
        <h4>Email</h4>
    
          {" "}
          <h3 href="#" className="hover:text-blue-400">
            {email}
          </h3>
  
      </div>
      {/* PHONE============ */}
      {data.phone && (
        <div className="flex my-4 gap-3 items-center">
          <BsTelephoneFill />
          <h4>Phone</h4>
          
            {" "}
            <h3 href="#" className="hover:text-blue-400">
              {data.phone}
            </h3>
     
        </div>
      )}

      {/* LINKED IN ============= */}
      {data.linkedin && (
        <div className="flex my-4 gap-3 items-center">
          <BsLinkedin />
          <h4>Linked In</h4>
          
            {" "}
            <h3  onClick={()=>{window.open(data.linkedin)}} className="hover:text-blue-400 cursor-pointer">
              Click here
            </h3>
      
        </div>
      )}

      {/* github =============== */}
      {data.github && <div className="flex my-4 gap-3 items-center">
        <AiFillGithub />
        <h4>GitHub</h4>
       
       
          <h3  onClick={()=>{window.open(data.github)}} className="hover:text-blue-400 cursor-pointer">
              Click here
            </h3>
       
      </div>}
    </>
  );
}

export default Contact;
