# Layer Navigator
You are looking at the library in early stage of development. More docs and examples will be available soon.

Layer Navigator is a react library that allows you to organize navigation between layers. It is not in any way a
replacement to routing libs like react router. In fact Layer Navigator is build to be seamlessly integrable with
React Router. You can also think about it as dynamic breadcrumbs interface (despite of breadcrumbs being only one
kind of possible visual controls).

Suppose that you have Todo App which allows you to manage your tasks organized
into categories. Each could have a parent category thus forming a tree of
categories.

It is easy to imagine that you may need to:

* Add new todos
* Edit existing todos
* Add new categories
* Edit existing categories

This functionality can be implemented in various ways. In most web applications
you will manage categories and todos separately. So, if you need to create Todo
with some category that does not exist yet, you need to return to a screen
where you add categories and create one. Things get complicated if you need
create deep hierarchies. Making step back each time you missed some entity
could be painful, especially in big enterprise applications with huge data
models and complex entity relations.

Another approach is common to native Windows/Mac applications, where you open
dialog/modal windows to create new entities or edit existing ones. However,
keeping a lot of modal windows opened in a single web page is usually a problem,
both in terms of UI and implementation.

Layer Navigator offers you another solution. Conceptually it is based on the
idea of breadcrumbs. However it is not in any way tied to breadcrumbs as a form
of UI control. It just implements the following principles:

1. Exactly one (last) layer is visible at any time
2. Exactly one parent for each layer (except the first one which has no parent)
3. React specific: all layers are keep mounted at any time by default, thus
  preserving their state (however you are able to unmount hidden layers or
  there individual parts if needed in order to optimize performance).

