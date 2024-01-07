import { Col } from "react-bootstrap"


const CartPlaceholders = () => {
  return (
    <Col md="auto">
      <div className="card mb-3" style={{ maxWidth: "540px" }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img src="https://images.wallpaperscraft.com/image/single/gray_color_background_145047_2560x1600.jpg" alt='...'  className="img-fluid rounded-start" />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title placeholder-glow"><span className="placeholder col-6"></span></h5>
              <p className="card-text placeholder-glow">
                <span className="placeholder col-4"></span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Col>
  )
}

export default CartPlaceholders