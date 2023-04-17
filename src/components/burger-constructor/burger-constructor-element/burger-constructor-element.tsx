import { useRef } from 'react';
import { useDrag, useDrop, XYCoord } from 'react-dnd';

import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import cs from 'classnames';

import { useAppSelector, useAppDispatch } from '../../../services/store';
import { removeIngredient, moveIngredient } from '../../../services/reducers/burger';
import { DND_TYPES } from '../../../utils/constants';

import styles from './burger-constructor-element.module.css';

const BurgerConstructorElement = ({
    element,
    isLocked = false,
    text,
    extraClass,
    type,
}: {
    element: element;
    isLocked?: boolean;
    text?: string;
    extraClass?: string;
    type?: 'top' | 'bottom';
}) => {
    const dispatch = useAppDispatch();
    const addedElements: element[] = useAppSelector((state) => state.burger.addedElements);

    const ref = useRef<HTMLDivElement>(null);

    const { uniqueId, name, price, image } = element;

    const deleteIngredientHandler = !isLocked
        ? () => {
              dispatch(removeIngredient(element));
          }
        : undefined;

    const currentIndex = addedElements.findIndex((addedIngredient) => {
        return addedIngredient.uniqueId === uniqueId;
    });

    const [{ isDragged }, dragRef] = useDrag(() => ({
        type: DND_TYPES.addedElement,
        item: { index: currentIndex },
        collect: (monitor) => ({
            isDragged: monitor.isDragging(),
        }),
    }));

    const [{ isDragOver }, dropTarget] = useDrop({
        accept: DND_TYPES.addedElement,
        collect(monitor) {
            return {
                isDragOver: monitor.isOver(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const { index: draggedIndex } = item as draggedAddedIngredient;
            const hoveredIndex = currentIndex;
            if (draggedIndex === currentIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
            if (draggedIndex < hoveredIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (draggedIndex > hoveredIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            dispatch(moveIngredient([draggedIndex, hoveredIndex]));
            (item as draggedAddedIngredient).index = hoveredIndex;
        },
    });

    dragRef(dropTarget(ref));

    return (
        <div className={cs(styles['burger-constructor-element'], {})} ref={!isLocked ? ref : null}>
            {!isLocked && <DragIcon type="primary" />}
            <ConstructorElement
                key={uniqueId}
                text={text || name}
                price={price}
                thumbnail={image}
                extraClass={cs(extraClass, {
                    [styles['burger-constructor-element__element_dragged']]: isDragged,
                    [styles['burger-constructor-element__element_drag-over']]: isDragOver,
                })}
                isLocked={isLocked}
                type={type}
                handleClose={deleteIngredientHandler}
            />
        </div>
    );
};

export default BurgerConstructorElement;
