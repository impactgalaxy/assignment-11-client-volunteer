import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
} from '@chakra-ui/react'

export default function FreequentlyAsk() {
    return (
        <div className='container m-auto p-5'>
            <div className='text-3xl text-center p-10'>Frequently Ask Question</div>
            <Accordion allowMultiple>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as='span' flex='1' textAlign='left'>
                                What is the most rewarding part of volunteering?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        Volunteering is an act of heroism on a grand scale. And it matters profoundly. It does more than help people beat the odds; it changes the odds.
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as='span' flex='1' textAlign='left'>
                                Where to find volunteer opportunities
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        If you&apos;re looking to meet new people, interested in charitable causes or want to learn skills to advance your career, volunteering may be a good option. When you volunteer, you have the opportunity to make a true difference in the lives of others.
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as='span' flex='1' textAlign='left'>
                                Why is volunteering important?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        If you&apos;re looking to meet new people, interested in charitable causes or want to learn skills to advance your career, volunteering may be a good option. When you volunteer, you have the opportunity to make a true difference in the lives of others.
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </div>
    )
}
