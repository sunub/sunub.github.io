import styled from 'styled-components';

function getHeight({ axis, size }: { axis?: string, size: number }) {
    return axis === 'horizontal' ? 1 : size;
}

function getWidth({ axis, size }: { axis?: string, size: number }) {
    return axis === 'vertical' ? 1 : size;
}

const Spacer = styled.span`
    display: block;
    width: ${getWidth}px;
    min-width: ${getWidth}px;
    height: ${getHeight}px;
    min-height: ${getHeight}px;
`;

const SpacerBar = styled.div`
    display: block;
    width: ${getWidth}px;
    max-width: ${getWidth}px;
    height: ${getHeight}px;
    max-height: ${getHeight}px;
`;

export { SpacerBar, Spacer };
