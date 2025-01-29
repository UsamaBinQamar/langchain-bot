"use client";
export default function Home() {
  const invokeAPI = async () => {
    const response = await fetch("/api/hello");
    const data = await response.json();
    console.log(data);
  };
  return (
    <>
      <h1>Hello</h1>
      <button onClick={invokeAPI}>Click</button>
    </>
  );
}
