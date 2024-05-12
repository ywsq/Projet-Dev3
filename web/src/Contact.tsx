import React from 'react';
import Banniere from "./Banniere";

function Contact() {
    return (
        <div className="container">
            <form action="action_page.php">

                <label htmlFor="fname">First Name</label>
                <input type="text" id="fname" name="firstname" placeholder="Your name.."/>

                    <label htmlFor="lname">Last Name</label>
                    <input type="text" id="lname" name="lastname" placeholder="Your last name.."/>

                        <label htmlFor="country">Country</label>
                        <select id="country" name="country">
                            <option value="260">Belgium</option>
                            <option value="389">Netherlands</option>
                        </select>

                        <label htmlFor="subject">Subject</label>
                        <textarea id="subject" name="subject" placeholder="Write something.."></textarea>

                        <input type="submit" value="Submit"/>

            </form>
        </div>
    );
}

export default Contact;