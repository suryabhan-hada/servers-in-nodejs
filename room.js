function Room(name, id ,owner)
{
    this.name=name;
    this.id=id;
    this.owner=owner;
    this.members=[];
}

Room.prototype.addmember=function(clientid)
{
    this.members.push(clientid);
};

module.exports=Room;