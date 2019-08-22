# Rascunho React Hooks

### Configuração inicial

- Adicionamos o plugin no Eslint
  > yarn add eslint-plugin-react-hooks -D
- No arquivo '.eslintrc.js', na parte de plugins, adicionamos o 'react-hooks', e na parte de regras adicionamos as regras descritas abaixo

```js
plugins: ['react', 'prettier', 'react-hooks'],
.
.
.
'
```

## Notas

- Até agora se a gente quisesse ter estado no nosso componente, teriamos que cria-lo no formato de classe. Mas a partir da versão 16.8 do react isso mudou.

## Hooks

### useState

- Pertence a funcão para criarmos estados numa função sem a necessidade de estarmos no formato de classe
- CADA ESTADO DA APLICAÇÃO FICA SEPARADO COM O HOOK 'USESTATE', diferente da abordagem por classe, onde temos o 'this.state' que armazena todos os estados

```js
/////////////////////////////////////////////////////////////////////////////
import React, { useState } from 'react';

function App() {
  // Primeiro parametro: recebe o estado inicial
  // Toda vez que alteramos este parametro o componente é renderizado
  // Segundo parametro: serve para atualizar o estado
  const [tech, setTech] = useState(['ReactJs', 'React Native']);

  const [newTeck, setNewTeck] = useState('');

  function handleAdd() {
    setTech([...tech, newTeck]);
    setNewTeck('');
  }

  return (
    <>
      <ul>
        {tech.map(t => (
          <li key={t}> {t}</li>
        ))}
      </ul>
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

/////////////////////////////////////////////////////////////////////////////
```

## useEffect

- Este hook basicamente sobrepõe os métodos do ciclo de vida que a gente tinha na abordagem por classe (ComponentDidMount, ComponentDidUpdate, ComponentWillAmount)

```js
//////////////////////////////////////////////////////////////////////
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

//////////////////////////////////////////////////////////////////////
```

## useMemo

- Utilizamos quando é necessario fazer algum calculado que vai ser renderizado baseado na alteração de alguma variavel/estado

```js
//////////////////////////////////////////////////////////////////////
const techSize = useMemo(() => tech.length, [tech]);
.
.
.
<strong>Você tem {techSize} tecnologias </strong>
//////////////////////////////////////////////////////////////////////
```

## useCallback

- O 'useCallback' é parecido com o 'useMemo', mas ao invés de retornar um unico valor ele retorna uma função

```js
//////////////////////////////////////////////////////////////////////
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
//////////////////////////////////////////////////////////////////////
```
