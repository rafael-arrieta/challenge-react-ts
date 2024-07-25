import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { fetchProductsCollectionData } from '../../services/fetchProducts.service';
import { ProductData } from '../../models/productData.model';
import './FiltersComponent.css';
import { Filter } from '../../models/filter.model';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface FilterProps {
    onSubmit: (filter: Filter) => void;
}

const FiltersComponent: React.FC<FilterProps> = ({ onSubmit }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [products, setProducts] = useState<ProductData[]>([]);
    const [make, setMake] = useState<string>('');
    const [model, setModel] = useState<string>('');
    const [year, setYear] = useState<string>('');
    const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 200000 });

    const [makes, setMakes] = useState<string[]>([]);
    const [models, setModels] = useState<string[]>([]);
    const [years, setYears] = useState<number[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchProductsCollectionData();

            if (!data) {
                return;
            }
            setProducts(data);

            const uniqueMakes = Array.from(new Set(data.map(product => product.make)));
            setMakes(uniqueMakes);

            const uniqueModels = Array.from(new Set(data.map(product => product.model)));
            setModels(uniqueModels);

            const uniqueYears = Array.from(new Set(data.map(product => product.year)));
            setYears(uniqueYears);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const filteredModels = products.filter(product => !make || product.make === make).map(product => product.model);
        setModels(Array.from(new Set(filteredModels)));

        const filteredYears = products.filter(product => (!make || product.make === make) && (!model || product.model === model)).map(product => product.year);
        setYears(Array.from(new Set(filteredYears)));
    }, [make, model, products]);

    const handleOpenFilters = () => setIsOpen(!isOpen);

    const handleSetMake = (e: any) => {
        const selectedMake = e.target.value;
        setMake(selectedMake);
        setModel('');
        setYear('');  
        setModels(products.filter(product => !selectedMake || product.make === selectedMake).map(product => product.model));
        setYears(products.filter(product => (!selectedMake || product.make === selectedMake) && (!model || product.model === model)).map(product => product.year));
    };

    const handleSetModel = (e: any) => {
        const selectedModel = e.target.value;
        setModel(selectedModel);
        setYear('');  
        setModels(products.filter(product => !selectedModel || product.make === selectedModel).map(product => product.model));
        setYears(products.filter(product => (!selectedModel || product.make === selectedModel) && (!model || product.model === model)).map(product => product.year));
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ make, model, year, priceRange });
    };

    return (
        <div className="filters-container">
            <div className="filters-header">
                <Button variant="primary" onClick={handleOpenFilters} className='filters-header-button'>
                    Filtrar {isOpen ? <FaChevronDown/> : <FaChevronUp/>}
                </Button>
            </div>
            {isOpen &&
            <Form onSubmit={handleSubmit} className="filters-form">
                <Form.Group controlId="makeSelect" className='filters-form-group'>
                    <Form.Label>Marca</Form.Label>
                    <Form.Control as="select" value={make} onChange={e => handleSetMake(e)}>
                        <option value="">Todas</option>
                        {makes.map((b, index) => (
                            <option key={index} value={b}>{b}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
            
                <Form.Group controlId="modelSelect" className='filters-form-group'>
                    <Form.Label>Modelo</Form.Label>
                    <Form.Control as="select" value={model} onChange={e => handleSetModel(e)}>
                        <option value="">Todos</option>
                        {models.map((m, index) => (
                            <option key={index} value={m}>{m}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
            
                <Form.Group controlId="yearSelect" className='filters-form-group'>
                    <Form.Label>Año</Form.Label>
                    <Form.Control as="select" value={year} onChange={e => setYear(e.target.value)}>
                        <option value="">Todos</option>
                        {years.map((y, index) => (
                            <option key={index} value={y}>{y}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
            
                <Form.Group controlId="minPriceInput" className='filters-form-group'>
                    <Form.Label>Precio mínimo</Form.Label>
                    <Form.Control type="number" value={priceRange.min} onChange={e => setPriceRange({ ...priceRange, min: parseFloat(e.target.value) })} />
                </Form.Group>
                <Form.Group controlId="maxPriceInput" className='filters-form-group'>
                    <Form.Label>Precio máximo</Form.Label>
                    <Form.Control type="number" value={priceRange.max} onChange={e => setPriceRange({ ...priceRange, max: parseFloat(e.target.value) })} />
                </Form.Group>
                    
                <Button type="submit" className='filters-form-button' variant='success'>Aplicar Filtros</Button>
            </Form>}
        </div>
    );
};

export default FiltersComponent;