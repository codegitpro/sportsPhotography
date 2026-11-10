package com.cl.dao;

import com.cl.entity.SheyingleixingEntity;
import com.baomidou.mybatisplus.mapper.BaseMapper;
import java.util.List;
import java.util.Map;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.plugins.pagination.Pagination;

import org.apache.ibatis.annotations.Param;
import com.cl.entity.view.SheyingleixingView;


/**
 * 摄影类型
 * 
 * @author 
 * @email 
 * @date 2026-03-12 19:47:40
 */
public interface SheyingleixingDao extends BaseMapper<SheyingleixingEntity> {
	
	List<SheyingleixingView> selectListView(@Param("ew") Wrapper<SheyingleixingEntity> wrapper);

	List<SheyingleixingView> selectListView(Pagination page,@Param("ew") Wrapper<SheyingleixingEntity> wrapper);
	
	SheyingleixingView selectView(@Param("ew") Wrapper<SheyingleixingEntity> wrapper);


}
