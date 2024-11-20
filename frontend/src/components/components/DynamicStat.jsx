import { Stat, StatLabel, StatNumber, StatHelpText, HStack, Icon } from "@chakra-ui/react";
import PropTypes from 'prop-types';

const DynamicStat = ({ label, mainText, helpText, IconComponent }) => {
  return (
    <Stat>
        <HStack>
            <Icon as={IconComponent} boxSize={6} />
            <StatLabel>{label}</StatLabel>
        </HStack>
        <StatNumber>{mainText}</StatNumber>
        <StatHelpText>{helpText}</StatHelpText>
    </Stat>
  );
}


DynamicStat.propTypes = {
  label: PropTypes.string.isRequired,
  mainText: PropTypes.string.isRequired,
  helpText: PropTypes.string.isRequired,
  IconComponent: PropTypes.elementType.isRequired,
};

export default DynamicStat;