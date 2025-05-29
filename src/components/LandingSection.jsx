import avatar from '../assets/avatar.jpg' 

export default function LandingSection(){
  return(
    <section className="bio-section">
      <h1>FullStack Web Developer</h1>
      <img src={avatar} alt="avatar image" />
      <p>Hello, I'm RamirezJM</p>
      
      
    </section>
  )
}