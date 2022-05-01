import React, { useContext, useState } from 'react';

import { RecommandContext } from './RecommandContext';
import { FoodDataContext } from './ContentRecommand';
import { InputGroup, Col, Row, Alert } from 'react-bootstrap';
import { FormContainer } from '../../Contents/Styles/styleContents';
import Button from '../../Components/Button';
import TagInput from './TagInput';

const RecsysInputForm = () => {
	const [breakfast, setBreakfast] = useState([]);
	const [lunch, setLunch] = useState([]);
	const [dinner, setDinner] = useState([]);
	const [snack, setSnack] = useState([]);
	const [showAlert, setShowAlert] = useState(false);
	const { dispatch } = useContext(RecommandContext);
	const { setFoodData } = useContext(FoodDataContext);

	/* 입력데이터 post, 결과 data get */
	const handleClickSubmit = () => {
		if (
			Array.isArray(breakfast) &&
			breakfast.length === 0 &&
			Array.isArray(lunch) &&
			lunch.length === 0 &&
			Array.isArray(dinner) &&
			dinner.length === 0 &&
			Array.isArray(snack) &&
			snack.length === 0
		) {
			/* 데이터가 입력되지 않은 경우 처리 */
			console.log('input empty');
			//return <></>;
			setShowAlert(true);
		} else {
			const FOODINFORM = [...breakfast, ...lunch, ...dinner, ...snack];
			// console.log(breakfast);
			// console.log(lunch);
			// console.log(dinner);
			// console.log(snack);
			// console.log('RecsysInputForm', FOODINFORM);
			setFoodData(FOODINFORM);
			dispatch({ type: 'OUTPUT' });
		}
	};
	const handleClickCancel = () => {
		dispatch({ type: 'RESET' });
	};
	const dataHandlerBreakfast = arr => {
		setBreakfast([...arr]);
	};
	const dataHandlerLunch = arr => {
		setLunch([...arr]);
	};
	const dataHandlerDinner = arr => {
		setDinner([...arr]);
	};
	const dataHandlerSnack = arr => {
		setSnack([...arr]);
	};
	return (
		<FormContainer>
			<InputGroup className="mb-3">
				<TagInput dataHandler={dataHandlerBreakfast} />
			</InputGroup>
			<br />
			<InputGroup className="mb-3">
				<TagInput dataHandler={dataHandlerLunch} />
			</InputGroup>
			<br />
			<InputGroup className="mb-3">
				<TagInput dataHandler={dataHandlerDinner} />
			</InputGroup>
			<br />
			<InputGroup className="mb-3">
				<TagInput dataHandler={dataHandlerSnack} />
			</InputGroup>
			<br />
			{showAlert && (
				<Alert variant="info">
					식사 정보가 입력되지 않았습니다. 정보를 입력해주세요.
					<hr />
					<div className="d-flex justify-content-end">
						<Button onClick={() => setShowAlert(false)} variant="outline-info">
							확 인
						</Button>
					</div>
				</Alert>
			)}
			<Row>
				<Col>
					<Button variant="outline-warning" onClick={handleClickCancel}>
						취소
					</Button>
				</Col>
				<Col>
					<Button variant="outline-success" onClick={handleClickSubmit}>
						완료
					</Button>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default RecsysInputForm;
