import Head from "next/head";

export default function Layout({ children }) {
	return (
		<div>
			<Head>
				<title>Quizzy | A quiz app by Julius R.</title>
				<meta
					name="description"
					content="A quiz app I built with Next.js"
				/>
			</Head>
			<header className="branding">
				<p className="txt-purple txt-lg">Quizzy</p>
			</header>
			<main className="main">{children}</main>
		</div>
	);
}
