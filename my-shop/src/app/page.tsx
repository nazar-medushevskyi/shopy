import Link from "../../node_modules/next/link";

const Home = () => {
  return (
    <>
      <Link href='./create'>
        Create
      </Link>

      <br />

      <Link href='./login'>
        login
      </Link>
    </>
  )
}

export default Home;
