import Header from './components/Header'
import LandingSection from './components/LandingSection'
import Stack from './components/Stack'
import Project from './components/Project'
import projects from './assets/data/projects.json'
import FormSection from './components/FormSection'
import Footer from './components/Footer'
import './App.css'

function App() {


  return (
    <>
      <Header />
      <main>
        <LandingSection />
        <Stack />
        <h2 id='projects-section'>My React Projects</h2>
        <section className='projects'>
          <Project data={projects} />
        </section>
        <h2 id='contact-section'>Contact me</h2>
        <FormSection />
      </main>
      <Footer/>
    </>
  )
}

export default App
