import { useState } from "react";
import gitLogo from "../assets/logoGitHub.png";
import Input from "../components/Input";
import ItemRepo from "../components/itemRepo";
import { Container } from "./styles";
import Button from "../components/Button";
import { api } from "../services/api";

function App() {
  const [currentRepo, setCurrentRepo] = useState("");
  const [repos, setRepos] = useState([]);

  const handleSearchRepo = async () => {
    const { data } = await api.get(`repos/${currentRepo}`);

    if (data.id) {
      const isExist = repos.find((repo) => repo.id === data.id);

      if (!isExist) {
        setRepos((prev) => [...prev, data]);
        setCurrentRepo("");
      }
    }
  };

  const handleRemoveRepo = (id) => {
    setRepos((current) => current.filter((repo) => repo.id !== id));
  };

  return (
    <Container>
      <img src={gitLogo} alt="git logo" width={72} height={72} />
      <Input
        value={currentRepo}
        onChange={(e) => setCurrentRepo(e.target.value)}
      />
      <Button onClick={handleSearchRepo} />

      {repos.map((repo) => (
        <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo} />
      ))}
      <ItemRepo />
    </Container>
  );
}

export default App;
