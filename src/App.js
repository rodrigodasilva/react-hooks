import React, { useState, useEffect, useMemo, useCallback } from 'react';

function App() {
  // Primeiro parametro: recebe o estado inicial
  // Toda vez que alteramos este parametro o componente é renderizado
  // Segundo parametro: serve para atualizar o estado
  const [tech, setTech] = useState([]);

  const [newTeck, setNewTeck] = useState('');

  // function handleAdd() {
  //   setTech([...tech, newTeck]);
  //   setNewTeck('');
  // }

  // Hook 'useCallback'
  /**
   * Utilizando o 'useCallback' a função 'handleAdd' só vai ser executado
   * quando as variaves 'newTeck' ou 'tech' sofrerem alteração, o que não
   * acontecia na implementação dessa função da forma acima
   */
  const handleAdd = useCallback(() => {
    setTech([...tech, newTeck]);
    setNewTeck('');
  }, [newTeck, tech]);

  // SIMULANDO 'ComponentDidMount'
  // Para que o useEffect somente uma vez passamos um array vazio no segundo paramentro
  // assim, como ele não tem uma variavel/estado para monitorar ele vai executar somente a primeira vez
  useEffect(() => {
    const storageTech = localStorage.getItem('tech');

    if (storageTech) {
      setTech(JSON.parse(storageTech));
    }
  }, []);

  // SIMULANDO 'ComponentDidUpdate'
  // Primeiro parametro: função que vai ser executada
  // Segundo parametro: quando a função do primeiro parametro vai ser executada
  useEffect(() => {
    localStorage.setItem('tech', JSON.stringify(tech));

    // PARA SIMULAR O 'ComponentWillAmount' retornamos uma função dentro
    // o 'useEffect', essa função vai ser executada sempre que componente
    // deixar de existir
    // - Podemos retornar funções para cada um dos 'useEffect'
    return () => {};
  }, [tech]); // sempre que o estado de tech mudar é executada a função do primeiro parametro

  // Hook 'useMemo'
  const techSize = useMemo(() => tech.length, [tech]);

  return (
    <>
      <ul>
        {tech.map(t => (
          <li key={t}> {t}</li>
        ))}
      </ul>
      <strong>Você tem {techSize} tecnologias </strong>
      <input
        type="text"
        value={newTeck}
        onChange={e => setNewTeck(e.target.value)}
      />
      <button type="button" onClick={handleAdd}>
        Adicionar
      </button>
    </>
  );
}

export default App;
