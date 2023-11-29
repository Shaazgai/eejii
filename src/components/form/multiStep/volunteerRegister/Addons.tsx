// /* eslint-disable import/extensions */
// import { addOns } from '@/data';
// import useStore from '@/store/useStore';
// import AddonCard from '../AddonCard';
// import Container from '../Container';
// import SectionHeader from '../SectionHeader';

// export default function Addons() {
//   const { step, increaseStep, decreaseStep } = useStore(state => state);

//   const onNext = () => {
//     increaseStep(step);
//   };

//   const onPrevious = () => {
//     decreaseStep(step);
//   };

//   return (
//     <Container onNext={onNext} onPreviousStep={onPrevious}>
//       <SectionHeader
//         title="Pick add-ons"
//         description="Add-ons help enhance your gaming experience."
//       />
//       <section className="mt-[22px] flex flex-col gap-4">
//         {addOns.map(addon => (
//           <AddonCard key={addon.id} addOn={addon} />
//         ))}
//       </section>
//     </Container>
//   );
// }
