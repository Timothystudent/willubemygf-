import { useEffect, useState } from 'react';
import screens from './contants/screens';
import utils from './utils/functions';
import Button from './components/Button';
import imgages from './assets';

function App() {
  const [positionBtnNo, setPositionBtnNo] = useState({
    top: '40%',
    left: '30%',
  });

  const [titleApp, setTitleApp] = useState('Celine, will u be my Girlfriend?');
  const [widthActualScreen, setWidthActualScreen] = useState(0);
  const [accept, setAccept] = useState(false);
  const [numImages, setNumImages] = useState(
    [...Array(100 - 0).keys()].map((x) => x + 100)
  );

  useEffect(() => {
    const screen = window.screen.availWidth;
    setWidthActualScreen(screen);

    if (screen < screens.mobile) {
      setPositionBtnNo({
        ...positionBtnNo,
        left: '10%',
      });
    } else {
      setPositionBtnNo({
        ...positionBtnNo,
        left: '30%',
      });
    }
  }, []);

  const handleHover = (e) => {
    const generatedTop = utils.generateNumBetweenParams();
    const generatedLeft = utils.generateNumBetweenParams();

    if (
      widthActualScreen < screens.mobile &&
      generatedTop < 70 &&
      generatedLeft < 70
    ) {
      setPositionBtnNo({
        top: `${String(generatedTop)}%`,
        left: `${String(generatedLeft)}%`,
      });
    } else if (
      widthActualScreen > screens.mobile &&
      generatedTop < 80 &&
      generatedLeft < 80
    ) {
      setPositionBtnNo({
        top: `${String(generatedTop)}%`,
        left: `${String(generatedLeft)}%`,
      });
    } else {
      handleHover();
    }
  };

  const handleClickYes = () => {
    setAccept(true);
    setTitleApp('Thank you, jadi so jadian ini wkwkwk');

    setTimeout(() => {
      setAccept(false);
      setTitleApp('Celine, will u be my Girlfriend?');
    }, 20000);
  };

  const getPositionImages = () => {
    const objPos = utils.getPositionImages(widthActualScreen);

    if (objPos !== null) {
      return objPos;
    } else {
      getPositionImages();
    }
  };

  return (
    <main className="container">
      <header>
        <h1>{titleApp}</h1>
      </header>
      <div className="app">
        <Button
          onmousemove={handleHover}
          position={positionBtnNo}
          text="Nmau"
          classes="btn_no_styles"
        />
        <Button onclick={handleClickYes} text="Iyess" classes="btn_margin_yes" />
      </div>
      {accept
        ? numImages.map((img, index) => {
            const estilos = getPositionImages();
            return (
              <img
                key={index}
                src={imgages.fuegos_artificiales}
                alt="fuegos-artificiales"
                style={estilos}
              />
            );
          })
        : null}
    </main>
  );
}

export default App;
