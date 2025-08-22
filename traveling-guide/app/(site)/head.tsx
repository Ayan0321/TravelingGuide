export default function Head() {
	const orgJsonLd = {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: "Traveling Guide",
		uRL: "https://example.com",
		contactPoint: [{ "@type": "ContactPoint", telephone: "+91-99999-99999", contactType: "customer service" }],
	}
	return (
		<>
			<title>Traveling Guide</title>
			<meta name="description" content="Traveling Guide across India: explore states and places, plan trips, and get quotes." />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<meta property="og:title" content="Traveling Guide" />
			<meta property="og:description" content="Explore states and places across India with a modern travel experience." />
			<meta property="og:type" content="website" />
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
		</>
	)
}