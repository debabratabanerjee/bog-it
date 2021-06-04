import Link from 'next/link';
import styles from '@styles/Post.module.css';

export default function About() {
  return (
    
    <main className={styles.container}>
        <section>
        <div>
      <h1>About Written Desk</h1>

      <h2>Table of Content</h2>
      <table><ul>
            <li><Link href="#thought">Thought</Link></li>
            <li><Link href="#features">Features</Link></li>
            <li><Link href="#faq">FAQ</Link></li>
            <li><Link href="#thanks">Thank You Note</Link></li>
            </ul>
            </table>
            <div id="thought"></div>
    <h3 style={{marginTop:'70px'}}><i>Thought for the Project</i></h3>
      <p >Firstly welcome you to the written Desk. And as you reached here a toast is mandatory for you.</p>
     <div>toast("Hello World")</div>
     <p>Its a basic idea likely got from Dev.to and medium a blogging platform.</p>
     </div>
     
        <div id="features"></div>
        <div >   
      <h3 style={{marginTop:'100px'}}><i>Features of the Project</i></h3>

    <p>
    - 👨‍🎤 Custom Firebase usernames<br/>
- 📰 Bot-friendly content (SEO)<br/>
- 🦾 Advanced SSR, SSG, and ISR techniques<br/>
- 🔥 Firestore CRUD and data modeling<br/>
- ⚛️ Reactive forms with react-hook-form<br/>
- 📂 Image file uploads<br/>
- 💞 Realtime hearts<br/>
- 🚀 Security & Deployment
        </p>    
     </div>
     <div id="faq"></div>
        <div >   
      <h3 style={{marginTop:'100px'}}><i>Frequently Asked Questions</i></h3>

      <details open>

<summary style={{fontSize:'1.5rem'}}>How to upload image in a blog?</summary>

Ans: You can get the idea by following the video given below:<hr/>
<iframe width="100%" height="300px" src="https://www.youtube.com/embed/h9P03f3RhVw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

</details>
<br/>
<br/>

<details >

<summary style={{fontSize:'1.5rem'}}>What is Heart/Unheart?</summary>

Ans: Well this is a feature simple as Like and not liking a Post.
<iframe width="100%" height="300px" src="https://www.youtube.com/embed/OCb73M0RPgo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

</details>  
     </div>
     <div  id="thanks"></div>

     <h3 style={{marginTop:'100px'}}><i>Thank You Note</i></h3>
     <div className="card card-info">   
     

    <p>
    - 👨‍🎤 We all took the part in scribbling at the last few pages of our school or college copies.  <br/>
- 📰 After a long run we can ignore the fact by saying we cann't think like before.<br/>
- 🦾 But we always remeber our teenage life as an adventure.<br/>-🔥 So live a little and share your childhood thought.
        </p> 
           
     </div>
     <div><center><Link href="/" >
          
          <button className="btn-blue">Go Home</button>
        </Link></center>
         </div>
     
     </section>
     <aside  className="card">
         <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFuaXVdS3bJQS8WUuM6dOIaSKlCR2pXjwzBQ&usqp=CAU" />
    <div className="card card-info" >
     
    <Link href="https://www.linkedin.com/in/debabrata-banerjee-0748b3180/" >
          
          <button><img src="/icons8-linkedin.svg"/></button>
        </Link>
        
      </div>
      
      </aside >
      
    </main>
  );
}
