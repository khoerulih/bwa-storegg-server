const Payment = require('./model');
const Bank = require('../bank/model');

module.exports = {
  index: async (req, res) => {
    try {
      const payment = await Payment.find().populate('banks');

      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };
      req.res.render('admin/payment/view_payment', {
        payment,
        alert,
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/payment');
    }
  },
  viewCreate: async (req, res) => {
    try {
      const banks = await Bank.find();
      res.render('admin/payment/create', {
        banks,
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/payment');
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { type, banks } = req.body;

      let payment = await Payment({ type, banks });
      await payment.save();

      req.flash('alertMessage', 'Berhasil Menambah Jenis Pembayaran');
      req.flash('alertStatus', 'success');

      res.redirect('/payment');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/payment');
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;

      let payment = await Payment.findOne({ _id: id });
      const banks = await Bank.find();
      res.render('admin/payment/edit', {
        payment,
        banks,
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/payment');
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { type, banks } = req.body;

      await Payment.findOneAndUpdate({ _id: id }, { type, banks });

      req.flash('alertMessage', 'Berhasil Mengubah Jenis Pembayaran');
      req.flash('alertStatus', 'success');

      res.redirect('/payment');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/payment');
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      await Payment.findOneAndRemove({ _id: id });

      req.flash('alertMessage', 'Berhasil Menghapus Jenis Pembayaran');
      req.flash('alertStatus', 'success');

      res.redirect('/payment');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/payment');
    }
  },
  actionStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const payment = await Payment.findOne({ _id: id });
      let status = payment.status === 'Y' ? 'N' : 'Y';

      await Payment.findOneAndUpdate(
        {
          _id: id,
        },
        {
          status,
        }
      );

      req.flash('alertMessage', 'Berhasil Mengubah Status Jenis Pembayaran');
      req.flash('alertStatus', 'success');

      res.redirect('/payment');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/payment');
    }
  },
};
