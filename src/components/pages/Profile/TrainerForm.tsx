import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Col,
  Form,
  Modal,
  OverlayTrigger,
  Popover,
  Row,
  Tooltip,
} from "react-bootstrap";
import {
  TrainerFormSchema,
  TrainerFormValues,
  TrainerInfo,
  UserInfo,
} from "../../../lib/types";
import { useForm, useWatch } from "react-hook-form";
import { useContext, useEffect } from "react";
import { ErrorContext, IErrorContext } from "../../../context/ErrorContext";
import axiosClient from "../../../utils/axiosConf";
import { useGetToken } from "../../../hooks/useGetToken";
import { useGetUserInfo } from "../../../hooks/useGetUserInfo";

interface Props {
  show: boolean;
  setShow: (show: boolean) => void;
  updateUser: () => void;
  trainer: TrainerInfo | null;
}

interface IPopover {
  header: string;
  msg: React.ReactNode;
}
const TrainerForm = (props: Props) => {
  const { show, setShow, updateUser, trainer } = props;
  const handleClose = () => setShow(false);
  console.log(trainer);

  const { addError } = useContext<IErrorContext>(ErrorContext);
  const { headers } = useGetToken();
  //   const defaultValues: TrainerFormValues = {
  //     firstName: user.trainer.firstName,
  //     lastName: user.trainer.lastName,
  //     gender: user.trainer.gender,
  //     level: user.trainer.level,
  //     physicalSweeper: user.trainer.physicalSweeper,
  //     specialSweeper: user.trainer.specialSweeper,
  //     wall: user.trainer.wall,
  //     physicalTank: user.trainer.physicalTank,
  //     specialTank: user.trainer.specialTank,
  //   } ;
  const defaultValues: TrainerFormValues = {};

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
    control,
    setValue,
  } = useForm<TrainerFormValues>({
    resolver: zodResolver(TrainerFormSchema),
    defaultValues,
  });

  useEffect(() => {
    if (trainer !== null && trainer !== undefined) {
      setValue("firstName", trainer.firstName);
      setValue("lastName", trainer.lastName);
      setValue("gender", trainer.gender);
      setValue("level", trainer.level);
      setValue("physicalSweeper", trainer.physicalSweeper);
      setValue("specialSweeper", trainer.specialSweeper);
      setValue("wall", trainer.wall);
      setValue("physicalTank", trainer.physicalTank);
      setValue("specialTank", trainer.specialTank);
    }
  }, [trainer, setValue]);

  const popover = (popprops: IPopover) => {
    const { header, msg } = popprops;

    return (
      <Popover id="popover-basic">
        <Popover.Header as="h3">{header}</Popover.Header>
        <Popover.Body>{msg}</Popover.Body>
      </Popover>
    );
  };

  const gameStats = useWatch({
    control,
    name: [
      "physicalSweeper",
      "specialSweeper",
      "wall",
      "physicalTank",
      "specialTank",
    ], // Add all the fields you want to watch
  });
  const totalAllocatedPoints = gameStats.reduce(
    (total, current) => total + (current || 0),
    0
  );
  const undistributedPoints = 100 - totalAllocatedPoints;

  const handleOnSubmit = async (data: TrainerFormValues) => {
    let isCancelled = false;
    axiosClient
      .put("/update-trainer-info", data, { headers })
      .then(() => {
        reset();
        setShow(false);
        updateUser();
      })
      .catch((error) => {
        if (!isCancelled && error.message) {
          let message = error.message;
          addError(message);
        }
      });
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Register a new trainer</Modal.Title>
      </Modal.Header>
      <Form noValidate onSubmit={handleSubmit((data) => handleOnSubmit(data))}>
        <Modal.Body className="px-4">
          <h3>General Info</h3>
          <Row className="g-3">
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
          <Row className="g-3">
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

          <h3>Favorite Pokemon Stats</h3>
          <h5>Undistributed points: {undistributedPoints}</h5>

          <Row className="g-3">
            <Col mb={2} className="p-2">
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 300, hide: 400 }}
                overlay={popover({
                  header: "Physical Sweeper",
                  msg: "Physical Sweeper is a Pokemon that has high Attack and Speed stats",
                })}
              >
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
                    PS
                  </Form.Label>
                </Form.Group>
              </OverlayTrigger>
            </Col>

            <Col mb={2} className="p-2">
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 300, hide: 400 }}
                overlay={popover({
                  header: "Special Sweeper",
                  msg: "Special Sweeper is a Pokemon that has high Special Attack and Speed stats",
                })}
              >
                <Form.Group className="form-floating">
                  <Form.Control
                    {...register("specialSweeper", { valueAsNumber: true })}
                    id="inputSS"
                    type="number"
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
              </OverlayTrigger>
            </Col>

            <Col mb={2} className="p-2">
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 300, hide: 400 }}
                overlay={popover({
                  header: "Wall",
                  msg: "Wall is a Pokemon that has high HP, Defense and Special Defense stats",
                })}
              >
                <Form.Group className="form-floating">
                  <Form.Control
                    {...register("wall", { valueAsNumber: true })}
                    id="inputW"
                    type="number"
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
              </OverlayTrigger>
            </Col>

            <Col mb={2} className="p-2">
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 300, hide: 400 }}
                overlay={popover({
                  header: "Physical Tank",
                  msg: "Physical Tank is a Pokemon that has high Attack and Defense stats",
                })}
              >
                <Form.Group className="form-floating">
                  <Form.Control
                    {...register("physicalTank", { valueAsNumber: true })}
                    id="inputPT"
                    type="number"
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
              </OverlayTrigger>
            </Col>

            <Col mb={2} className="p-2">
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 300, hide: 400 }}
                overlay={popover({
                  header: "Special Tank",
                  msg: "Special Tank is a Pokemon that has high Special Attack and Special Defense stats",
                })}
              >
                <Form.Group className="form-floating">
                  <Form.Control
                    {...register("specialTank", { valueAsNumber: true })}
                    id="inputST"
                    type="number"
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
              </OverlayTrigger>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
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
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default TrainerForm;
