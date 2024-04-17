import './Filtragem.css';

const Filtragem = () => {
    return (
        <>
           <div id="containerFiltragem">
            <div className='filterBox'>
                <div id='botaoDeCima'>
                    <button className='filterButtons'>TAMANHOS</button>
                </div>
                <div>
                    <button className='filterButtons'>PREÇO</button>
                </div>
                <div>
                    <button className='filterButtons'>CORES</button>
                </div>
                <div>
                    <button className='filterButtons'>CATEGORIA</button>
                </div>
                <div>
                    <button className='filterButtons'>MARCA</button>
                </div>
                <div>
                    <button id='botaoPesquisar'>PESQUISAR</button>
                </div>
            </div>
           </div>
        </>
    );
};

export default Filtragem;
