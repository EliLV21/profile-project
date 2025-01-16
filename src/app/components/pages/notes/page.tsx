import { AccordionList } from '../../shared/accordion/accordion-list';

const NotesPage: React.FC = () => {
  return (
    <>
      <div className="container p-8 z-10 absolute">
        <AccordionList />
      </div>
    </>
  );
};

export default NotesPage;
