'use client';

import { faker } from '@faker-js/faker';
import { Button, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import RunAwayButton from '../runAwayButton/RunAwayButton';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/src/shared/constants/ROUTES';
import { useUserStore } from '@/src/shared/store/hooks/useUserStore';
import { APP_CONFIG } from '@/src/shared/config';
import { GravestoneWrapper, PrimaryButton, SecondaryButton } from '@/src/shared';

const generateName = () => faker.person.fullName();

const STEPS = {
  INTRODUCTION: 'introduction',
  NAME: 'name',
  SELECTED_NAME: 'selected_name',
  CONTRACT: 'contract',
} as const;

const blockStyle = 'flex grow flex-col items-center justify-center gap-2';

const contractContent = [
  {
    title: 'ARTICULUS II: De Pizza Perpetua',
    content:
      'Promitto ego omnem pizzam cum ananase comedere in aeternum. Etiam si hoc crimen contra naturam est, Diabolus ridet et clamat "BENE FACTUM!" Pineapple pizza delenda est, sed ego eam amare debeo. Mamma mia, quid feci?',
  },
  {
    title: 'ARTICULUS III: De Sockibus Disparibus',
    content:
      'In perpetuum, nunquam duas sockos eiusdem coloris inveniam. Una semper erit rubra, altera viridis. Vel una cum striarum, altera cum maculis. Haec est poena infernalis! Lavatorium machinarium semper unum sockem devorabit. Mysterium manet in aeternum.',
  },
  {
    title: 'ARTICULUS IV: De Musica Diaboli',
    content:
      '"Baby Shark doo doo doo doo" in capite meo resonabit quotidie, omni hora, sine fine, sine quiete, sine misericordia. Etiam in somnis. Etiam in morte. Doo doo doo doo doo doo. AAAAAAHHHHH! Non possum stare! Sed contractus est contractus.',
  },
  {
    title: 'ARTICULUS V: De USB Perpetuo Inverso',
    content:
      'Omnes USB cables tres tentationes requirent antequam correcte inserantur. Prima via: falsa. Secunda via: etiam falsa. Tertia via: mirabile! Sed quarta via necessaria erit quia tertia via non erat vera. Haec est magia nigra USB!',
  },
  {
    title: 'ARTICULUS VI: De Wifi Intermittente',
    content:
      'Wifi connexio semper interrumpetur in momento maximo importantiae. Durante videochatibus importantibus: POOF! Durante ludi finalis momenti: GONE! Durante "I do" in matrimonio virtuali: DISCONNECTED! Diabolus ridet: "Have you tried turning it off and on again?" SEMPER!',
  },
  {
    title: 'ARTICULUS VII: De Steppo Lego',
    content:
      'Semper, in medio noctis, quando ad latrinam ambulo, pedis mei Lego inveniet. Dolor! Agonia! Tormenta! Mille Lego bricks in toto domo sparsi erunt invisibiles usque ad momentum contacti. Tunc: OUCH! Diabolus collection Lego habet infinitam!',
  },
  {
    title: 'ARTICULUS VIII: De Autocorrecto Maligno',
    content:
      'Telephoni autocorrectus omnia verba mea transformabit in verba absurda et embarassosa. "Salve, Boss!" mutabitur in "Salve, Bossypants!" Mater mea recipiet: "Odi te" pro "Amo te". Diabolus iPhone habet et bugs non fixit. MUHAHAHA!',
  },
  {
    title: 'ARTICULUS IX: De Spoilers Inevitabilibus',
    content:
      'Omnes series televisivi et cinematographi spoilers accipiam ante videre possum. Facebook, Twitter, Random Strangers in via: omnes clamabunt finales revelandos. "Snape killed Dumbledore!" "Bruce Willis was dead!" "It was all a dream!" NOOOO!',
  },
  {
    title: 'ARTICULUS X: De Popcorno Ultimo',
    content:
      'Semper, SEMPER, unum granum popcorn inter dentes meos captivum erit post comedendum. Lingua mea id invenire non potest, sed scio ibi est. Dental floss non auxiliat. Tantum dentista cum tools torturae id removere potest. Diabolus dentista non est, sed ridet!',
  },
  {
    title: 'ARTICULUS XI: De Battera Mortua',
    content:
      'Telephoni battera ad 1% descendet in momento quando directionem ad locum importantissimum necessito. "Low Battery" apparabit. Charger? Acasa oblitus sum! Power bank? Etiam oblitus! Diabolus chargers omnes in infernum portavit. Murphy\'s Law in actione!',
  },
  {
    title: 'ARTICULUS XII: De Printero Maledicto',
    content:
      'Printer meus laborabit solum quando non necessarius est. Quando documenta importanta printare debeo: "PC LOAD LETTER" - quid significat?! Cyan ink cartridge vacua est etiam si documentum nigrum et album est! Printer smells fear et devorat paper!',
  },
  {
    title: 'ARTICULUS XIII: De Horologio Biologico Perverso',
    content:
      'Corpus meum expergiscetur quinque minuta ante alarma sonat in dies laboris. Sed in dies festi? Alarma sonat et ego dormire volo usque ad meridiem! Non possum. Oculi mei aperti sunt. Diabolus schedulas meas habet!',
  },
  {
    title: 'ARTICULUS XIV: De Linea Lenta Semper',
    content:
      'In supermercato, semper lineam lentissimam eligam. Persona ante me cupones habebit mille! Price check necessarius erit! Ratio calculi non laborabit! Aliae lineae velociter moventur, sed mea? STATUA! Si lineam muto, illa linea statim lenta fit. CURSED!',
  },
  {
    title: 'ARTICULUS XV: De Epistula Finali',
    content:
      'Haec clausula finalis est. Si ego hunc contractum lego completum usque ad finem, congratulationes! Perdidi tempus pretiosum! Poteram videam Netflix, sed non! Contractum Latinum legi! Diabolus dicit: "Gotcha, sucker!" Et nunc debeo ACCEPTARE aut Reject button fugiet per aeternum. Checkmate, mortalis!',
  },
];

const Contract = () => {
  const router = useRouter();

  const { setName: setUserName, name: userName } = useUserStore((state) => state);

  const [name, setName] = useState('');
  const [isNameRegenerate, setIsNameRegenerate] = useState(false);
  const [currentStep, setCurrentStep] = useState<(typeof STEPS)[keyof typeof STEPS]>(STEPS.INTRODUCTION);

  const isIntroductionStep = currentStep === STEPS.INTRODUCTION;
  const isNameStep = currentStep === STEPS.NAME;
  const isContractStep = currentStep === STEPS.CONTRACT;
  const isSelectedNameStep = currentStep === STEPS.SELECTED_NAME;
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (name.length > 0) return;

    changeName(true);
  }, []);

  const changeName = (skip = false) => {
    setName(generateName());

    if (isNameRegenerate || skip) return;

    setIsNameRegenerate(true);
  };

  const selectName = () => {
    setUserName(name);
    setCurrentStep(STEPS.SELECTED_NAME);
  };

  const onAccept = async () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }

    await new Promise((resolve) => setTimeout(resolve, APP_CONFIG.LAUGH_AUDIO_DURATION + 2000));

    //setCurrentStep(STEPS.INTRODUCTION);
    router.push(ROUTES.QUIZ);
  };

  return (
    <div className="flex h-screen max-h-dvh flex-col items-center justify-center gap-2">
      <GravestoneWrapper className="shrink-0">
        {isIntroductionStep && (
          <div className={blockStyle}>
            <Typography className="text-center">Welcome to Hell Chat, lost soul.</Typography>
            <PrimaryButton onClick={() => setCurrentStep(STEPS.NAME)}>Hello</PrimaryButton>
          </div>
        )}
        {isNameStep && (
          <div className={blockStyle}>
            <Typography className="text-center">
              {!isNameRegenerate ? (
                <>
                  Let’s introduce ourselves.
                  <br />
                  I’m Devil. And your name must be:
                </>
              ) : (
                'You dare to tell me I made a mistake? Hah, lowly human! Okay, I’ll give you another try. So, your name is:'
              )}
            </Typography>

            <Typography className="bg-gray-light text-primary w-full rounded-full p-2 text-center">
              {name.length > 0 ? name : <span className="opacity-0">Generating name...</span>}
            </Typography>
            <div className="flex justify-center gap-2">
              <SecondaryButton onClick={() => changeName(false)}>No</SecondaryButton>
              <PrimaryButton onClick={selectName}>Yes</PrimaryButton>
            </div>
          </div>
        )}
        {(isSelectedNameStep || isContractStep) && (
          <div className={blockStyle}>
            <Typography className="text-center">
              Fantastic, I know I’m always right! Now let us proceed to the contract.
            </Typography>
            <PrimaryButton onClick={() => setCurrentStep(STEPS.CONTRACT)}>What??</PrimaryButton>
          </div>
        )}
      </GravestoneWrapper>
      <AnimatePresence>
        {isContractStep && (
          <motion.div
            initial={{ opacity: 0, y: '-200dvh' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '200dvh' }}
            transition={{ duration: 2 }}
            className="scrollbar-hidden absolute z-20 h-dvh max-h-dvh w-dvw overflow-hidden text-black"
          >
            <div className="flex h-full w-full flex-col items-center justify-start gap-2 p-8">
              <Typography variant="h1" className="font-horrorfind mb-4 text-center">
                CONTRACTUS DIABOLICUS AETERNUS
              </Typography>

              <div className="scrollbar-hidden max-h-[80dvh] max-w-4xl space-y-4 overflow-y-auto text-left">
                <Typography className="text-black">
                  <Typography variant="h2" component="strong" className="font-horrorfind">
                    ARTICULUS I: De Anima Vendita
                  </Typography>
                  <br />
                  Ego, {userName}, hodie et in perpetuum, animam meam vendere volo Diabolo Magnifico pro nihilo.
                  Intellego quod anima mea valoris minimi est, sed Diabolus, benevolentia sua infinita, eam accipere
                  dignatur. Gratias tibi ago, O Princeps Tenebrarum!'
                </Typography>

                {contractContent.map((item) => (
                  <Typography key={item.title} className="text-black">
                    <Typography variant="h2" component="strong" className="font-horrorfind">
                      {item.title}
                    </Typography>
                    <br />
                    {item.content}
                  </Typography>
                ))}

                <Typography className="mt-4 text-center text-xs text-black italic opacity-70">
                  *Contractus non refundabilis est. Caveat emptor! Diabolus non responsibilis est pro remorse, regrets,
                  aut "buyer's remorse". Attorney Diabolicus scripsit hoc fine printum quod nemo legit. Si legis hoc,
                  too late! MUHAHAHA! 😈
                </Typography>
              </div>

              <div className="sticky bottom-4 mt-8 flex w-full justify-around">
                <RunAwayButton />
                <Button
                  onClick={onAccept}
                  sx={{
                    position: 'absolute',
                    bottom: '70%',
                    right: '10%',
                    scale: 2,
                    padding: 0,
                  }}
                  size="large"
                  color="error"
                >
                  ACCEPTO
                </Button>
              </div>

              <img
                src="/contract_bg.jpg"
                fetchPriority="high"
                alt="Contract"
                className="absolute right-0 bottom-0 z-[-1] h-full w-full"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <audio src="/audio/laugh.mp3" ref={audioRef} onEnded={() => router.push(ROUTES.QUIZ)} />
    </div>
  );
};

export default Contract;
