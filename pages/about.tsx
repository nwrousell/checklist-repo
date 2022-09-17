import { Logo } from "../components/Logo";
import Heading from "../ui/Heading";


export default function About(){
    return (
        <div className="text-gray-700">
            {/* <div className="max-w-xl m-auto mt-16 text-center"> */}
                <div className="mb-8">
                    <Heading>What is Checklist Repo?</Heading>
                    <p className="text-lg leading-8">Checklist Repo is a place to find and share routines, workflows, and other checklists that help structure creative projects and guide effort.</p>
                </div>
                <div className="mb-8">
                    <Heading>Who is Checklist Repo for?</Heading>
                    <p className="mb-4 text-lg leading-8">Writers, musicians, designers, developers, problem-solvers, or anyone who likes to follow a process to guarantee some level of quality.</p>
                    <p className="text-lg leading-8">Whether you're looking for a <i>piano practice routine</i>, some ideas on <i>how to start a paper</i>, or a <i>procedure to follow when designing</i>, Checklist Repo is made for you.</p>
                </div>
                <div className="mb-8">
                    <Heading>Development</Heading>
                    <p className="text-lg leading-8">Checklist Repo was made by <a href="https://www.noahrousell.com" target="_blank" className="border-b-2 border-primary-700 border-opacity-20 text-primary-700 hover:border-none">Noah Rousell</a>. If you've found any bugs, have feedback, or are itching with a question, you can contact him <a className="border-b-2 border-primary-700 border-opacity-20 text-primary-700 hover:border-none" href="https://www.noahrousell.com/contact" target="_blank">here</a>.</p>
                </div>
            {/* </div> */}
        </div>
    )
}