import axios from "axios";

export default async function Api() {
const result = await axios.get('http://localhost:1337/api/posts')
return result
}