export default function Home() {
  const players = [
    {
      name: "Marcos",
      color: "bg-[#ff0000]",
    },
    {
      name: "Faria",
      color: "bg-[#0000ff]",
    },
    {
      name: "Emanuel",
      color: "bg-[#00ff00]",
    },
    {
      name: "João Lucas",
      color: "bg-[#ffa500]",
    },
  ];

  return (
    <main className="flex flex-col gap-4 items-center justify-between p-10">
      <h1 className="text-2xl font-bold text-center">Bem vindo ao Bozó WEB!</h1>

      <p className="text-center">
        Escolha quantos jogadores participarão do jogo.
      </p>

      <div className="grid grid-cols-2 w-full gap-4">
        {players.map((player) => (
          <div key={player.name} className="text-center">
            <p>{player.name}</p>
            <div className={`${player.color} w-full h-2`} />
          </div>
        ))}
      </div>
    </main>
  );
}
