// ** React Imports
import { useState } from 'react';
// ** MUI Imports
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const SubscriptionFooter = (props) => {
  // ** Props
  const { data } = props;
  console.log('Data received in SubscriptionFooter:', data);
  // ** Props
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const renderAccordion = () => {
    if (!data || !data.faq || !Array.isArray(data.faq)) {
      console.log('No FAQ data');
      return null;
    }

    console.log('FAQ data:', data.faq);

    return data.faq.map((item) => {
      console.log('Accordion item:', item);
      return (
        <Accordion key={item.id} elevation={0} expanded={expanded === item.id} onChange={handleChange(item.id)}>
          <AccordionSummary
            expandIcon={false}
            id={`pricing-accordion-${item.id}-header`}
            aria-controls={`pricing-accordion-${item.id}-content`}
          >
            <Typography>{item.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ color: 'text.secondary' }}>{item.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      );
    });
  };

  return (
    <>
      <Box sx={{ mb: 8, textAlign: 'center' }}>
        <Typography variant="h2" sx={{ mb: 2.5 }}>
          FAQs
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>Let us help answer the most common questions.</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <div>{renderAccordion()}</div>
      </Box>
    </>
  );
};

export default SubscriptionFooter;
