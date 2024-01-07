import React from 'react'

const EmptyCart = () => {
  return (
    <section className={["vh-100"].join(" ")}>
    <div
      className="h-100 py-2"
    >
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card bg-dark text-white"
              style={{ borderRadius: "1rem", maxHeight: "100rem" }}
            >
              <div className="card-body p-5 text-center">
                <h2 className="fw-bold mb-2 text-uppercase">Cart is empty</h2>
                <div style={{ borderRadius: "1rem" }}>
                  <img
                    src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3NmaXR3cm01ZTNyNWlzcWFjdzh2ZGxhNWM4enBqNGg1MnRsd2U1aiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/12Bpme5pTzGmg8/giphy.gif"
                    className="card-img-bottom"
                    style={{ borderRadius: "1rem" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default EmptyCart