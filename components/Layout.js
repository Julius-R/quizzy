import Head from "next/head";
import Link from "next/link";

export default function Layout({ children }) {
	return (
		<>
			<Head>
				<title>Quizzy | A quiz app by Julius R.</title>
				<meta
					name="description"
					content="A quiz app I built with Next.js"
				/>
			</Head>
			<header>
				<div className="container">
					<Link href={"/"}>
						<a className="txt-purple txt-lg">Quizzy</a>
					</Link>
				</div>
			</header>
			<main>
				{children}
			</main>
		</>
	);
}
