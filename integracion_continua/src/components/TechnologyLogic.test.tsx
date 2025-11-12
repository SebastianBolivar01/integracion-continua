import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TechnologyLogic from './TechnologyLogic';

describe('TechnologyLogic Component', () => {
  test('renders correctly', () => {
    render(<TechnologyLogic />);

    expect(screen.getByText('Tecnología y Pensamiento Lógico')).toBeInTheDocument();
    expect(screen.getByText('Construcción con bloques (tipo Minecraft)')).toBeInTheDocument();
    expect(screen.getByText('Simulación de robots con movimientos básicos')).toBeInTheDocument();
  });
});
