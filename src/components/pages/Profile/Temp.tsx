import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { TrainerFormSchema, TrainerFormValues } from "../../../lib/types";
import { useForm, useWatch } from "react-hook-form";

interface Props {
  show: boolean;
  setShow: (show: boolean) => void;
}
const TrainerForm = (props: Props) => {
  const { show, setShow } = props;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<TrainerFormValues>({
    resolver: zodResolver(TrainerFormSchema),
  });

  //   const gameStats = useWatch({
  //     control,
  //     name: [
  //       "physicalSweeper",
  //       "specialSweeper",
  //       "wall",
  //       "physicalTank",
  //       "specialTank",
  //     ], // Add all the fields you want to watch
  //   });
  //   const totalAllocatedPoints = gameStats.reduce(
  //     (total, current) => total + (current || 0),
  //     0
  //   );

  const handleOnSubmit = async (data: TrainerFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1000000)); // Sleep for 1000 seconds
    console.log(data);
  };

  const undistributedPoints = 100;
  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Register a new trainer</Modal.Title>
      </Modal.Header>
      <Form noValidate onSubmit={handleSubmit(data => console.log(data))}>
        <Modal.Body>
          <h3>General Info</h3>
          <Row className="g-3 px-2">
            <Form.Group className="form-floating mb-4 col">
              <Form.Control
                {...register("firstName")}
                type="text"
                id="typefirstNameX"
                className="form-control form-control-lg"
                placeholder="firstName"
                isInvalid={!!errors.firstName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName && errors.firstName?.message}
              </Form.Control.Feedback>
              <Form.Label
                className="form-label text-black-50 mx-2"
                htmlFor="typefirstNameX"
              >
                First Name
              </Form.Label>
            </Form.Group>

            <Form.Group className="form-floating mb-4 col">
              <Form.Control
                {...register("lastName")}
                type="text"
                id="typelastNameX"
                className="form-control form-control-lg"
                placeholder="lastName"
                isInvalid={!!errors.lastName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName && errors.lastName?.message}
              </Form.Control.Feedback>
              <Form.Label
                className="form-label text-black-50 mx-2"
                htmlFor="typelastNameX"
              >
                Last Name
              </Form.Label>
            </Form.Group>
          </Row>
          <Row className="g-3 px-2">
            <Col md={8} className="p-2">
              <Form.Group className="form-floating">
                <Form.Select
                  {...register("gender")}
                  id="inputGender"
                  className="form-select"
                  defaultValue="Choose Gender..."
                  isInvalid={!!errors.gender}
                >
                  <option disabled>Choose Gender...</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.gender && errors.gender?.message}
                </Form.Control.Feedback>
                <Form.Label
                  className="form-label text-black-50"
                  htmlFor="inputGender"
                >
                  Gender
                </Form.Label>
              </Form.Group>
            </Col>
            <Col mb={2} className="p-2">
              <Form.Group className="form-floating">
                <Form.Control
                  {...register("level", { valueAsNumber: true })}
                  id="inputLevel"
                  type="number"
                  placeholder="Enter level"
                  isInvalid={!!errors.level}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.level && errors.level?.message}
                </Form.Control.Feedback>
                <Form.Label
                  className="form-label text-black-50"
                  htmlFor="inputLevel"
                >
                  Level
                </Form.Label>
              </Form.Group>
            </Col>
          </Row>

          <h3>Game Stats</h3>
          <h5>Undistributed points: {undistributedPoints}</h5>

          <Row className="g-3 px-2">
            {/* <Col mb={2} className="p-2">
              <Form.Group className="form-floating">
                <Form.Control
                  {...register("physicalSweeper", { valueAsNumber: true })}
                  id="inputPhysicalSweeper"
                  type="number"
                  placeholder="Enter PhysicalSweeper"
                  isInvalid={!!errors.physicalSweeper}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.physicalSweeper && errors.physicalSweeper?.message}
                </Form.Control.Feedback>
                <Form.Label
                  className="form-label text-black-50"
                  htmlFor="inputPhysicalSweeper"
                >
                  Physical Sweeper
                </Form.Label>
              </Form.Group>
            </Col> */}
            {/* <Col mb={2} className="p-2">
              <Form.Group className="form-floating">
                <Form.Control
                  {...register("physicalSweeper", { valueAsNumber: true })}
                  id="inputPS"
                  type="number"
                  name="PS"
                  placeholder="Physical Sweeper"
                  isInvalid={!!errors.physicalSweeper}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.physicalSweeper && errors.physicalSweeper?.message}
                </Form.Control.Feedback>
                <Form.Label
                  className="form-label text-black-50"
                  htmlFor="inputPS"
                >
                  PS
                </Form.Label>
              </Form.Group>
            </Col> */}

            {/* <Col mb={2} className="p-2">
              <Form.Group className="form-floating">
                <Form.Control
                  {...register("specialSweeper", { valueAsNumber: true })}
                  id="inputSS"
                  type="number"
                  name="SS"
                  placeholder="Special Sweeper"
                  isInvalid={!!errors.specialSweeper}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.specialSweeper && errors.specialSweeper?.message}
                </Form.Control.Feedback>
                <Form.Label
                  className="form-label text-black-50"
                  htmlFor="inputSS"
                >
                  SS
                </Form.Label>
              </Form.Group>
            </Col>

            <Col mb={2} className="p-2">
              <Form.Group className="form-floating">
                <Form.Control
                  {...register("wall", { valueAsNumber: true })}
                  id="inputW"
                  type="number"
                  name="W"
                  placeholder="Wall"
                  isInvalid={!!errors.wall}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.wall && errors.wall?.message}
                </Form.Control.Feedback>
                <Form.Label
                  className="form-label text-black-50"
                  htmlFor="inputW"
                >
                  W
                </Form.Label>
              </Form.Group>
            </Col>

            <Col mb={2} className="p-2">
              <Form.Group className="form-floating">
                <Form.Control
                  {...register("physicalTank", { valueAsNumber: true })}
                  id="inputPT"
                  type="number"
                  name="PT"
                  placeholder="Physical Tank"
                  isInvalid={!!errors.physicalTank}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.physicalTank && errors.physicalTank?.message}
                </Form.Control.Feedback>
                <Form.Label
                  className="form-label text-black-50"
                  htmlFor="inputPT"
                >
                  PT
                </Form.Label>
              </Form.Group>
            </Col>

            <Col mb={2} className="p-2">
              <Form.Group className="form-floating">
                <Form.Control
                  {...register("specialTank", { valueAsNumber: true })}
                  id="inputST"
                  type="number"
                  name="ST"
                  placeholder="Special Tank"
                  isInvalid={!!errors.specialTank}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.specialTank && errors.specialTank?.message}
                </Form.Control.Feedback>
                <Form.Label
                  className="form-label text-black-50"
                  htmlFor="inputST"
                >
                  ST
                </Form.Label>
              </Form.Group>
            </Col> */}
          </Row>
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            Submit 
            </Button>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            {!isSubmitting && <>Save Changes</>}
            {isSubmitting && (
              <>
                <span className="spinner-grow spinner-grow-sm"></span>
                <span role="status">Saving...</span>
              </>
            )}
          </Button>
        </Modal.Footer> */}
      </Form>
    </Modal>
  );
};

export default TrainerForm;
