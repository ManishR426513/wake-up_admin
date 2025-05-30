import React, {
	cloneElement,
	forwardRef,
	HTMLAttributes,
	ReactElement,
	ReactNode,
	useRef,
} from 'react';
import classNames from 'classnames';
import useDomRect from '../../hooks/useDomRect';
import useDir from '../../hooks/useDir';
import { IValidationBaseProps } from './Validation';

interface IFieldWrapProps extends HTMLAttributes<HTMLDivElement>, Partial<IValidationBaseProps> {
	children: ReactElement;
	className?: string;
	firstSuffix?: ReactNode;
	lastSuffix?: ReactNode;
}
const FieldWrap = forwardRef<HTMLDivElement, IFieldWrapProps>((props, ref) => {
	const {
		// eslint-disable-next-line react/prop-types
		children,
		// eslint-disable-next-line react/prop-types
		className,
		// eslint-disable-next-line react/prop-types
		firstSuffix,
		// eslint-disable-next-line react/prop-types
		lastSuffix,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars, react/prop-types
		isValidMessage,
		// eslint-disable-next-line react/prop-types
		isValid,
		// eslint-disable-next-line react/prop-types
		isTouched,
		// eslint-disable-next-line react/prop-types
		invalidFeedback,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars, react/prop-types
		validFeedback,
		...rest
	} = props;

	const sharedClasses = classNames(
		'absolute top-[2px] bottom-[2px] flex justify-center items-center px-1 rounded',
	);

	const divFirstRef = useRef<HTMLDivElement>(null);
	const [domFirstRect] = useDomRect(divFirstRef);

	const divLastRef = useRef<HTMLDivElement>(null);
	const [domLastRect] = useDomRect(divLastRef);

	const { isLTR } = useDir();

	return (
		<div
			ref={ref}
			data-component-name='FieldWrap'
			className={classNames('relative', className)}
			{...rest}>
			{firstSuffix && (
				<div ref={divFirstRef} className={classNames(sharedClasses, 'start-px')}>
					{firstSuffix}
				</div>
			)}
			{cloneElement(children, {
				isValid,
				isTouched,
				invalidFeedback,
				style: {
					paddingLeft:
						(firstSuffix && isLTR && domFirstRect?.width) ||
						(lastSuffix && !isLTR && domLastRect?.width),
					paddingRight:
						(firstSuffix && !isLTR && domFirstRect?.width) ||
						(lastSuffix && isLTR && domLastRect?.width),
				},
			})}
			{lastSuffix && (
				<div ref={divLastRef} className={classNames(sharedClasses, 'end-px')}>
					{lastSuffix}
				</div>
			)}
		</div>
	);
});
FieldWrap.displayName = 'FieldWrap';

export default FieldWrap;
