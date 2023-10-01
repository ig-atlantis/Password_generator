import { useState, useCallback, useEffect, useRef } from 'react';


function App() {

///////////////////// USE STATE HOOK //////////////////////////////////////////////////////
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");


//////////// USE CALLBACK HOOK //////////////////////////////////////////////////////////
  const passwordGenerator = useCallback( ()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed) str+="0123456789";
    if(characterAllowed) str+="!@#$%^&*(){}[]";

    for (let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length+1);
      pass += str.charAt(char);
    }

    setPassword(pass)
  }, [length, numberAllowed, characterAllowed, setPassword])


///////////////// USE EFFECT HOOK ////////////////////////////////////////////////////////////
  useEffect( ()=>{
    passwordGenerator()
  }, [length, numberAllowed, characterAllowed, passwordGenerator])


///////////////// USE REF HOOK //////////////////////////////////////////////////////////
  const passwordReference = useRef(null);


////////////////// USE CALLBACK HOOK /////////////////////////////////////////////////////
  const copyPassword = useCallback( ()=>{
    passwordReference.current?.select();
    // passwordReference.current?.setSelectionRange(0,7)
    window.navigator.clipboard.writeText(password);
    alert("Password copied!");
  }, [password])



//MAIN BODY
  return (

      <div className='w-full max-w-[500px] mx-auto rounded-lg px-4 py-3 my-8 text-orange-600 bg-gray-500'>
     


        <h1 className="text-4xl text-center font-bold text-white pt-5">Password Generator</h1>

          <div className='flex shadow rounded-lg overflow-hidden mb-4 mt-4'>
            <input 
              type='text' 
              value={password} 
              className='outline-none w-full py-1 px-3' 
              placeholder='password' 
              readOnly
              ref={passwordReference}
            />
            <button 
              className="outline-none bg-red-600 text-white px-3 py-3 hover:bg-black" 
              onClick={copyPassword}
              >
              Copy
            </button>
          </div>


          <div className='flex text-sm gap-x-3'>

              <div className='flex items-center gap-x-1'>
                <input 
                  type='range' 
                  min={8} max={16} 
                  value={length} 
                  className='cursor-pointer'
                  id='rangeInput' 
                  onChange={ (e) => {setLength(e.target.value)} }
                />
                <label htmlFor='rangeInput'>Length: {length}</label>
              </div>

              <div className='flex items-center gap-x-1 mx-5'>
                <input 
                  type='checkbox' 
                  defaultChecked={numberAllowed}
                  id='numberInput'
                  onChange={ () => {
                  setNumberAllowed((prev)=>!prev)
                  }}
                />
                <label htmlFor='numberInput'>Number</label>
              </div>

              <div className='flex items-center gap-x-1 mx-5'>
                <input 
                  type='checkbox' 
                  defaultChecked={characterAllowed}
                  id='characterInput'
                  onChange={ () => {
                  setCharacterAllowed((prev)=>!prev)
                  }}
                />
                <label htmlFor='characterInput'>Character</label>
              </div>

          </div>  



      </div>

  )
}

export default App
