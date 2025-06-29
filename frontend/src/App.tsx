import { Button } from "@/components/ui/button"; // Importe o Button

function App() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mr-4">
        Bem-vindo ao E-commerce SMM!
      </h1>
      <Button onClick={() => alert("Botão clicado!")}>
        Meu Primeiro Botão Shadcn
      </Button>
    </div>
  );
}

export default App;
